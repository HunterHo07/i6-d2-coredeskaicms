/**
 * API Service for CoreDeskAi
 * Handles real API calls with security validation and auto-detection
 */

import { 
  validateApiRequest, 
  sanitizeApiResponse, 
  checkRateLimit, 
  generateRequestId 
} from './security';

// Request timeout (30 seconds)
const REQUEST_TIMEOUT = 30000;

/**
 * Auto-detects the structure of API response data
 * @param {any} data - API response data
 * @returns {object} - Detected schema information
 */
export function detectApiSchema(data) {
  if (!data) {
    return { type: 'null', structure: null };
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { 
        type: 'array', 
        structure: { empty: true },
        itemCount: 0
      };
    }

    // Analyze first few items to detect structure
    const sampleSize = Math.min(data.length, 5);
    const samples = data.slice(0, sampleSize);
    const commonFields = new Map();
    
    samples.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => {
          const value = item[key];
          const type = Array.isArray(value) ? 'array' : typeof value;
          
          if (!commonFields.has(key)) {
            commonFields.set(key, { type, count: 0, examples: [] });
          }
          
          const field = commonFields.get(key);
          field.count++;
          
          // Store example values (first 3)
          if (field.examples.length < 3 && value !== null && value !== undefined) {
            field.examples.push(value);
          }
        });
      }
    });

    // Convert to schema format
    const fields = {};
    commonFields.forEach((info, key) => {
      fields[key] = {
        type: info.type,
        frequency: info.count / sampleSize,
        examples: info.examples,
        isCommon: info.count >= sampleSize * 0.8 // Field appears in 80%+ of items
      };
    });

    return {
      type: 'array',
      structure: {
        itemCount: data.length,
        sampleSize,
        fields,
        commonFieldCount: Object.keys(fields).length
      }
    };
  }

  if (typeof data === 'object') {
    const fields = {};
    Object.entries(data).forEach(([key, value]) => {
      const type = Array.isArray(value) ? 'array' : typeof value;
      fields[key] = {
        type,
        example: value,
        isNested: type === 'object' && value !== null
      };
    });

    return {
      type: 'object',
      structure: {
        fields,
        fieldCount: Object.keys(fields).length
      }
    };
  }

  return {
    type: typeof data,
    structure: { value: data }
  };
}

/**
 * Generates column definitions for table display
 * @param {object} schema - Detected schema from detectApiSchema
 * @returns {array} - Column definitions for table
 */
export function generateTableColumns(schema) {
  if (schema.type !== 'array' || !schema.structure.fields) {
    return [];
  }

  const columns = [];
  const fields = schema.structure.fields;

  // Sort fields by frequency and type preference
  const sortedFields = Object.entries(fields).sort(([, a], [, b]) => {
    // Prioritize common fields
    if (a.isCommon !== b.isCommon) {
      return b.isCommon - a.isCommon;
    }
    // Prioritize simple types
    const typeOrder = { string: 0, number: 1, boolean: 2, object: 3, array: 4 };
    return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5);
  });

  sortedFields.forEach(([key, info]) => {
    columns.push({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      type: info.type,
      sortable: ['string', 'number', 'boolean'].includes(info.type),
      filterable: info.type === 'string' || info.type === 'number',
      examples: info.examples || [],
      frequency: info.frequency
    });
  });

  return columns.slice(0, 10); // Limit to 10 columns for UI
}

/**
 * Makes a secure API request with validation and sanitization
 * @param {object} config - Request configuration
 * @returns {Promise<object>} - API response with metadata
 */
export async function makeApiRequest(config) {
  const requestId = generateRequestId();
  const startTime = Date.now();

  try {
    // Rate limiting check
    const rateLimitCheck = checkRateLimit(config.clientId || 'anonymous', 5, 60000);
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.error);
    }

    // Validate request
    const validation = validateApiRequest({
      url: config.url,
      method: config.method || 'GET',
      headers: config.headers || {},
      body: config.body
    });

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const { url, method, headers, body } = validation.sanitized;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Make the actual request
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Check response status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse response
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Response is not valid JSON');
      }
    }

    // Sanitize response data
    const sanitizedData = sanitizeApiResponse(data);

    // Detect schema
    const schema = detectApiSchema(sanitizedData);

    // Generate table columns if applicable
    const columns = generateTableColumns(schema);

    const endTime = Date.now();

    return {
      success: true,
      requestId,
      data: sanitizedData,
      schema,
      columns,
      metadata: {
        url,
        method,
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        dataType: schema.type,
        recordCount: Array.isArray(sanitizedData) ? sanitizedData.length : 1,
        rateLimitRemaining: rateLimitCheck.remaining
      }
    };

  } catch (error) {
    const endTime = Date.now();
    
    // Log error (in production, send to monitoring service)
    console.error(`API Request Error [${requestId}]:`, {
      url: config.url,
      error: error.message,
      duration: endTime - startTime
    });

    return {
      success: false,
      requestId,
      error: error.message,
      data: null,
      schema: null,
      columns: [],
      metadata: {
        url: config.url,
        method: config.method || 'GET',
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        rateLimitRemaining: 0
      }
    };
  }
}

/**
 * Validates and tests an API endpoint
 * @param {string} url - API URL to test
 * @param {object} headers - Optional headers
 * @returns {Promise<object>} - Test result
 */
export async function testApiEndpoint(url, headers = {}) {
  try {
    const result = await makeApiRequest({
      url,
      method: 'GET',
      headers,
      clientId: 'test'
    });

    if (result.success) {
      return {
        success: true,
        message: 'API endpoint is accessible and returns valid data',
        dataPreview: Array.isArray(result.data) 
          ? result.data.slice(0, 3) 
          : result.data,
        schema: result.schema,
        recordCount: result.metadata.recordCount,
        responseTime: result.metadata.responseTime
      };
    } else {
      return {
        success: false,
        message: result.error,
        suggestions: getSuggestions(result.error)
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to test API endpoint',
      error: error.message
    };
  }
}

/**
 * Provides suggestions based on error messages
 * @param {string} error - Error message
 * @returns {array} - Array of suggestions
 */
function getSuggestions(error) {
  const suggestions = [];
  
  if (error.includes('CORS')) {
    suggestions.push('The API does not allow cross-origin requests. Contact the API provider to enable CORS.');
  }
  
  if (error.includes('401') || error.includes('403')) {
    suggestions.push('Check your API key or authentication token.');
    suggestions.push('Ensure the token has the correct permissions.');
  }
  
  if (error.includes('404')) {
    suggestions.push('Verify the API URL is correct.');
    suggestions.push('Check the API documentation for the correct endpoint.');
  }
  
  if (error.includes('timeout')) {
    suggestions.push('The API is taking too long to respond. Try again later.');
    suggestions.push('Check if the API service is operational.');
  }
  
  if (error.includes('JSON')) {
    suggestions.push('The API response is not in JSON format.');
    suggestions.push('Ensure the endpoint returns JSON data.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Check the API documentation for requirements.');
    suggestions.push('Verify the URL and authentication details.');
  }
  
  return suggestions;
}

// Note: detectApiSchema and generateTableColumns are already exported above
