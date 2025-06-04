'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Key, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Info,
  Shield,
  Clock,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { Input, FormField } from '../ui/Input';
import { testApiEndpoint } from '@/lib/api-service';

const ApiConnector = ({ onApiConnect, onApiTest }) => {
  const [formData, setFormData] = useState({
    url: '',
    method: 'GET',
    headers: {
      'Authorization': '',
      'X-API-Key': '',
      'Content-Type': 'application/json'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Example APIs for quick testing
  const exampleApis = [
    {
      name: 'JSONPlaceholder Posts',
      url: 'https://jsonplaceholder.typicode.com/posts',
      description: 'Sample blog posts data'
    },
    {
      name: 'JSONPlaceholder Users',
      url: 'https://jsonplaceholder.typicode.com/users',
      description: 'Sample user profiles'
    },
    {
      name: 'REST Countries',
      url: 'https://restcountries.com/v3.1/all',
      description: 'World countries information'
    },
    {
      name: 'Cat Facts API',
      url: 'https://catfact.ninja/facts',
      description: 'Random cat facts'
    }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear errors when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.url) {
      newErrors.url = 'API URL is required';
    } else if (!formData.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestApi = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      // Prepare headers (remove empty values)
      const cleanHeaders = {};
      Object.entries(formData.headers).forEach(([key, value]) => {
        if (value && value.trim()) {
          cleanHeaders[key] = value.trim();
        }
      });
      
      const result = await testApiEndpoint(formData.url, cleanHeaders);
      setTestResult(result);
      
      if (result.success && onApiTest) {
        onApiTest(result);
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test API',
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (testResult && testResult.success && onApiConnect) {
      onApiConnect({
        url: formData.url,
        headers: formData.headers,
        schema: testResult.schema,
        data: testResult.dataPreview
      });
    }
  };

  const loadExampleApi = (example) => {
    setFormData(prev => ({
      ...prev,
      url: example.url,
      headers: {
        ...prev.headers,
        'Authorization': '',
        'X-API-Key': ''
      }
    }));
    setTestResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* API Input Form */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Connect Your API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input */}
          <FormField
            label="API Endpoint URL"
            required
            error={errors.url}
          >
            <Input
              placeholder="https://api.yourservice.com/data"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              leftIcon={<Globe className="w-4 h-4" />}
              error={!!errors.url}
            />
          </FormField>

          {/* Headers */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-200">
              Authentication (Optional)
            </label>
            
            <FormField label="Authorization Header">
              <Input
                placeholder="Bearer your-token-here"
                value={formData.headers.Authorization}
                onChange={(e) => handleInputChange('headers.Authorization', e.target.value)}
                leftIcon={<Key className="w-4 h-4" />}
                type="password"
              />
            </FormField>
            
            <FormField label="API Key Header">
              <Input
                placeholder="your-api-key"
                value={formData.headers['X-API-Key']}
                onChange={(e) => handleInputChange('headers.X-API-Key', e.target.value)}
                leftIcon={<Key className="w-4 h-4" />}
                type="password"
              />
            </FormField>
          </div>

          {/* Test Button */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleTestApi}
              loading={isLoading}
              leftIcon={<Play className="w-4 h-4" />}
              className="flex-1"
            >
              Test Connection
            </Button>
            
            {testResult && testResult.success && (
              <Button
                variant="glow"
                onClick={handleConnect}
                leftIcon={<CheckCircle className="w-4 h-4" />}
              >
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Result */}
      <AnimatePresence>
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant={testResult.success ? "default" : "default"}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
                    {testResult.success ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      testResult.success ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {testResult.success ? 'Connection Successful!' : 'Connection Failed'}
                    </h4>
                    <p className="text-neutral-300 mb-4">{testResult.message}</p>
                    
                    {testResult.success && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                          <Database className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                          <div className="text-sm text-neutral-400">Records</div>
                          <div className="font-semibold text-white">{testResult.recordCount}</div>
                        </div>
                        <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                          <Clock className="w-5 h-5 text-green-400 mx-auto mb-1" />
                          <div className="text-sm text-neutral-400">Response</div>
                          <div className="font-semibold text-white">{testResult.responseTime}ms</div>
                        </div>
                        <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                          <Shield className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                          <div className="text-sm text-neutral-400">Type</div>
                          <div className="font-semibold text-white">{testResult.schema?.type}</div>
                        </div>
                        <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                          <Info className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                          <div className="text-sm text-neutral-400">Fields</div>
                          <div className="font-semibold text-white">
                            {testResult.schema?.structure?.fieldCount || 'N/A'}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {testResult.suggestions && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-neutral-200">Suggestions:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-400">
                          {testResult.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example APIs */}
      <Card variant="default">
        <CardHeader>
          <CardTitle className="text-lg">Try Example APIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {exampleApis.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => loadExampleApi(example)}
                className="p-3 text-left rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-white mb-1">{example.name}</div>
                <div className="text-sm text-neutral-400 mb-2">{example.description}</div>
                <div className="text-xs text-blue-400 font-mono truncate">{example.url}</div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card variant="default" className="border-yellow-500/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-400 mb-1">Security Notice</h4>
              <p className="text-sm text-neutral-300">
                All API requests are validated and sanitized for security. We prevent injection attacks, 
                validate URLs, and sanitize responses. Rate limiting is applied to prevent abuse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiConnector;
