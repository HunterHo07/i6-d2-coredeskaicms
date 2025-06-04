/**
 * Security utilities for CoreDeskAi
 * Handles input validation, sanitization, and injection prevention
 */

// URL validation regex
const URL_REGEX = /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;

// Common injection patterns to detect
const INJECTION_PATTERNS = [
  // SQL Injection
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
  // XSS patterns
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  // Command injection
  /(\||;|&|`|\$\(|\${)/g,
  // Path traversal
  /\.\.\//g,
  // HTML injection
  /<iframe|<object|<embed|<link|<meta/gi
];

// Allowed HTTP methods
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

// Maximum payload size (1MB)
const MAX_PAYLOAD_SIZE = 1024 * 1024;

/**
 * Validates if a URL is safe and properly formatted
 * @param {string} url - The URL to validate
 * @returns {object} - Validation result with isValid and error
 */
export function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required and must be a string' };
  }

  // Check length
  if (url.length > 2048) {
    return { isValid: false, error: 'URL is too long (max 2048 characters)' };
  }

  // Check format
  if (!URL_REGEX.test(url)) {
    return { isValid: false, error: 'Invalid URL format. Must be a valid HTTP/HTTPS URL' };
  }

  // Check for injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(url)) {
      return { isValid: false, error: 'URL contains potentially malicious content' };
    }
  }

  // Check for localhost/private IPs (prevent SSRF)
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' || 
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')) {
      return { isValid: false, error: 'Private/local URLs are not allowed for security reasons' };
    }
  } catch (e) {
    return { isValid: false, error: 'Invalid URL format' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates API headers for security
 * @param {object} headers - Headers object to validate
 * @returns {object} - Validation result
 */
export function validateHeaders(headers) {
  if (!headers || typeof headers !== 'object') {
    return { isValid: true, sanitized: {} };
  }

  const sanitized = {};
  const allowedHeaders = [
    'authorization',
    'content-type',
    'accept',
    'user-agent',
    'x-api-key',
    'x-auth-token'
  ];

  for (const [key, value] of Object.entries(headers)) {
    const lowerKey = key.toLowerCase();
    
    // Check if header is allowed
    if (!allowedHeaders.includes(lowerKey)) {
      continue;
    }

    // Validate header value
    if (typeof value !== 'string' || value.length > 1024) {
      continue;
    }

    // Check for injection patterns
    let hasInjection = false;
    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(value)) {
        hasInjection = true;
        break;
      }
    }

    if (!hasInjection) {
      sanitized[lowerKey] = value.trim();
    }
  }

  return { isValid: true, sanitized };
}

/**
 * Sanitizes API response data to prevent XSS
 * @param {any} data - Data to sanitize
 * @returns {any} - Sanitized data
 */
export function sanitizeApiResponse(data) {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    // Remove potentially dangerous HTML/JS
    return data
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe|<object|<embed|<link|<meta/gi, '&lt;$&')
      .trim();
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeApiResponse(item));
  }

  if (typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      // Sanitize key names
      const cleanKey = key.replace(/[<>'"&]/g, '');
      if (cleanKey && cleanKey.length <= 100) {
        sanitized[cleanKey] = sanitizeApiResponse(value);
      }
    }
    return sanitized;
  }

  return data;
}

/**
 * Validates HTTP method
 * @param {string} method - HTTP method to validate
 * @returns {object} - Validation result
 */
export function validateHttpMethod(method) {
  if (!method || typeof method !== 'string') {
    return { isValid: false, error: 'HTTP method is required' };
  }

  const upperMethod = method.toUpperCase();
  if (!ALLOWED_METHODS.includes(upperMethod)) {
    return { isValid: false, error: `HTTP method ${method} is not allowed` };
  }

  return { isValid: true, method: upperMethod };
}

/**
 * Validates request payload size
 * @param {any} payload - Payload to validate
 * @returns {object} - Validation result
 */
export function validatePayloadSize(payload) {
  if (!payload) {
    return { isValid: true };
  }

  const size = JSON.stringify(payload).length;
  if (size > MAX_PAYLOAD_SIZE) {
    return { isValid: false, error: `Payload too large (${size} bytes, max ${MAX_PAYLOAD_SIZE})` };
  }

  return { isValid: true };
}

/**
 * Rate limiting check (simple in-memory implementation)
 */
const rateLimitStore = new Map();

export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }
  
  const requests = rateLimitStore.get(identifier);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => time > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return { 
      allowed: false, 
      error: `Rate limit exceeded. Max ${maxRequests} requests per ${windowMs/1000} seconds`,
      resetTime: validRequests[0] + windowMs
    };
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitStore.set(identifier, validRequests);
  
  return { 
    allowed: true, 
    remaining: maxRequests - validRequests.length 
  };
}

/**
 * Comprehensive API request validation
 * @param {object} request - Request object with url, method, headers, body
 * @returns {object} - Validation result with sanitized data
 */
export function validateApiRequest(request) {
  const errors = [];
  
  // Validate URL
  const urlValidation = validateUrl(request.url);
  if (!urlValidation.isValid) {
    errors.push(`URL: ${urlValidation.error}`);
  }
  
  // Validate method
  const methodValidation = validateHttpMethod(request.method || 'GET');
  if (!methodValidation.isValid) {
    errors.push(`Method: ${methodValidation.error}`);
  }
  
  // Validate headers
  const headerValidation = validateHeaders(request.headers);
  
  // Validate payload size
  const payloadValidation = validatePayloadSize(request.body);
  if (!payloadValidation.isValid) {
    errors.push(`Payload: ${payloadValidation.error}`);
  }
  
  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sanitized: null
    };
  }
  
  return {
    isValid: true,
    errors: [],
    sanitized: {
      url: request.url,
      method: methodValidation.method,
      headers: headerValidation.sanitized,
      body: request.body
    }
  };
}

/**
 * Generate a safe request ID for logging
 * @returns {string} - Safe request ID
 */
export function generateRequestId() {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
