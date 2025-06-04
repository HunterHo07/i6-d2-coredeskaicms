'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Settings,
  Download,
  RefreshCw,
  Search,
  Filter,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Globe,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import ApiConnector from '@/components/demo/ApiConnector';
import { makeApiRequest } from '@/lib/api-service';

export default function DemoPage() {
  const [selectedAPI, setSelectedAPI] = useState('users');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [connectedApi, setConnectedApi] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [apiColumns, setApiColumns] = useState([]);
  const [showApiConnector, setShowApiConnector] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Mock API data
  const mockAPIs = {
    users: {
      name: 'User Management API',
      url: 'https://api.example.com/users',
      data: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', created: '2024-01-15', revenue: 1250 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', created: '2024-01-14', revenue: 2100 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', created: '2024-01-13', revenue: 850 },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', created: '2024-01-12', revenue: 3200 },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Pending', created: '2024-01-11', revenue: 0 }
      ]
    },
    orders: {
      name: 'E-commerce Orders API',
      url: 'https://api.shop.com/orders',
      data: [
        { id: 1001, customer: 'John Doe', amount: 299.99, status: 'Completed', date: '2024-06-04', items: 3 },
        { id: 1002, customer: 'Jane Smith', amount: 149.50, status: 'Processing', date: '2024-06-04', items: 1 },
        { id: 1003, customer: 'Bob Johnson', amount: 89.99, status: 'Shipped', date: '2024-06-03', items: 2 },
        { id: 1004, customer: 'Alice Brown', amount: 459.99, status: 'Completed', date: '2024-06-03', items: 5 },
        { id: 1005, customer: 'Charlie Wilson', amount: 199.99, status: 'Cancelled', date: '2024-06-02', items: 1 }
      ]
    },
    analytics: {
      name: 'Analytics API',
      url: 'https://api.analytics.com/metrics',
      data: [
        { metric: 'Page Views', value: 45678, change: '+12.5%', period: 'Last 30 days' },
        { metric: 'Unique Visitors', value: 12345, change: '+8.3%', period: 'Last 30 days' },
        { metric: 'Conversion Rate', value: '3.2%', change: '+0.5%', period: 'Last 30 days' },
        { metric: 'Revenue', value: '$23,456', change: '+15.2%', period: 'Last 30 days' },
        { metric: 'Bounce Rate', value: '42.1%', change: '-2.1%', period: 'Last 30 days' }
      ]
    }
  };

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,345', change: '+12%', color: 'blue' },
    { icon: DollarSign, label: 'Revenue', value: '$45,678', change: '+8%', color: 'green' },
    { icon: BarChart3, label: 'API Calls', value: '1.2M', change: '+15%', color: 'purple' },
    { icon: TrendingUp, label: 'Growth', value: '23%', change: '+5%', color: 'cyan' }
  ];

  // Handle API connection
  const handleApiConnect = async (apiConfig) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const result = await makeApiRequest({
        url: apiConfig.url,
        headers: apiConfig.headers,
        clientId: 'demo-user'
      });

      if (result.success) {
        setConnectedApi(apiConfig);
        setApiData(result.data);
        setApiColumns(result.columns);
        setSelectedAPI('connected');
        setShowApiConnector(false);
      } else {
        setApiError(result.error);
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle API test
  const handleApiTest = (testResult) => {
    console.log('API test result:', testResult);
  };

  const handleRefresh = async () => {
    if (selectedAPI === 'connected' && connectedApi) {
      setIsLoading(true);
      setApiError(null);

      try {
        const result = await makeApiRequest({
          url: connectedApi.url,
          headers: connectedApi.headers,
          clientId: 'demo-user'
        });

        if (result.success) {
          setApiData(result.data);
          setApiColumns(result.columns);
        } else {
          setApiError(result.error);
        }
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleExport = (format) => {
    const dataToExport = getCurrentData();
    const filename = `coredeskai-export-${Date.now()}`;

    if (format === 'csv') {
      exportToCSV(dataToExport, filename);
    } else if (format === 'json') {
      exportToJSON(dataToExport, filename);
    }
  };

  // Get current data based on selected API
  const getCurrentData = () => {
    if (selectedAPI === 'connected' && apiData) {
      return apiData;
    }
    return mockAPIs[selectedAPI]?.data || [];
  };

  // Get current columns
  const getCurrentColumns = () => {
    if (selectedAPI === 'connected' && apiColumns.length > 0) {
      return apiColumns;
    }

    const data = getCurrentData();
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => ({
        key,
        title: key.charAt(0).toUpperCase() + key.slice(1),
        type: typeof data[0][key],
        sortable: true,
        filterable: true
      }));
    }
    return [];
  };

  // Export functions
  const exportToCSV = (data, filename) => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = (data, filename) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter current data
  const filteredData = getCurrentData().filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <main className="pt-16">
        {/* Demo Header */}
        <section className="py-12 bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Live Demo Dashboard
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Experience CoreDeskAi in action. This fully functional demo shows how any REST API 
                can be transformed into a powerful admin dashboard in minutes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* API Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      API Connection
                    </CardTitle>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowApiConnector(!showApiConnector)}
                      leftIcon={<Globe className="w-4 h-4" />}
                    >
                      {showApiConnector ? 'Hide Connector' : 'Connect Your API'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* API Connection Error */}
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm">{apiError}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Connected API Status */}
                  {connectedApi && selectedAPI === 'connected' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Connected to your API</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setConnectedApi(null);
                            setApiData(null);
                            setApiColumns([]);
                            setSelectedAPI('users');
                          }}
                        >
                          Disconnect
                        </Button>
                      </div>
                      <div className="text-xs text-neutral-400 font-mono mt-1">{connectedApi.url}</div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Connected API Option */}
                    {connectedApi && (
                      <motion.button
                        onClick={() => setSelectedAPI('connected')}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedAPI === 'connected'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-neutral-700 hover:border-neutral-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-semibold text-green-400">Your Connected API</div>
                        <div className="text-sm text-neutral-400 font-mono truncate">{connectedApi.url}</div>
                      </motion.button>
                    )}

                    {/* Mock APIs */}
                    {Object.entries(mockAPIs).map(([key, api]) => (
                      <motion.button
                        key={key}
                        onClick={() => setSelectedAPI(key)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedAPI === key
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-neutral-700 hover:border-neutral-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-semibold text-white">{api.name}</div>
                        <div className="text-sm text-neutral-400 font-mono">{api.url}</div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* API Connector */}
            <AnimatePresence>
              {showApiConnector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <ApiConnector
                    onApiConnect={handleApiConnect}
                    onApiTest={handleApiTest}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <Card key={index} variant="default" hover={true}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className={`text-sm text-${stat.color}-400`}>{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Data Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {selectedAPI === 'connected' && connectedApi
                        ? 'Your API Data'
                        : mockAPIs[selectedAPI]?.name || 'Data'
                      }
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
                      >
                        Refresh
                      </Button>
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExport('csv')}
                          leftIcon={<Download className="w-4 h-4" />}
                        >
                          Export CSV
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport('json')}
                        leftIcon={<Download className="w-4 h-4" />}
                      >
                        Export JSON
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filters */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder="Search data..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftIcon={<Search className="w-4 h-4" />}
                      />
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                      Filters
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                      Add New
                    </Button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    {filteredData.length > 0 ? (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-700">
                            {getCurrentColumns().map((column) => (
                              <th key={column.key} className="text-left py-3 px-4 text-neutral-300 font-medium">
                                {column.title}
                                {column.type && (
                                  <span className="ml-2 text-xs text-neutral-500">
                                    ({column.type})
                                  </span>
                                )}
                              </th>
                            ))}
                            <th className="text-left py-3 px-4 text-neutral-300 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.slice(0, 50).map((row, index) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                              className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                            >
                              {getCurrentColumns().map((column) => {
                                const value = row[column.key];
                                return (
                                  <td key={column.key} className="py-3 px-4 text-neutral-300">
                                    {typeof value === 'string' && value.includes('@') ? (
                                      <span className="text-blue-400">{value}</span>
                                    ) : typeof value === 'string' && value.startsWith('$') ? (
                                      <span className="text-green-400 font-medium">{value}</span>
                                    ) : typeof value === 'boolean' ? (
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                      }`}>
                                        {value ? 'True' : 'False'}
                                      </span>
                                    ) : typeof value === 'object' && value !== null ? (
                                      <span className="text-purple-400 text-xs">
                                        {Array.isArray(value) ? `Array(${value.length})` : 'Object'}
                                      </span>
                                    ) : (
                                      <span className="truncate max-w-xs block">
                                        {value !== null && value !== undefined ? String(value) : '-'}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm" title="View Details">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" title="Edit">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-12">
                        <Database className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-400 mb-2">No Data Available</h3>
                        <p className="text-neutral-500">
                          {selectedAPI === 'connected'
                            ? 'Connect to an API to see data here'
                            : 'Select an API source to view data'
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {filteredData.length > 0 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-neutral-400">
                        Showing {Math.min(filteredData.length, 50)} of {filteredData.length} results
                        {filteredData.length > 50 && (
                          <span className="text-yellow-400 ml-2">
                            (Limited to first 50 for performance)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled={currentPage === 1}>
                          Previous
                        </Button>
                        <span className="text-neutral-400 text-sm px-3">
                          Page {currentPage}
                        </span>
                        <Button variant="outline" size="sm" disabled={filteredData.length <= 50}>
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* API Info */}
                  {selectedAPI === 'connected' && connectedApi && (
                    <div className="mt-6 p-4 bg-neutral-800/30 rounded-lg border border-neutral-700">
                      <h4 className="text-sm font-medium text-neutral-300 mb-2">API Information</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-neutral-500">Endpoint:</span>
                          <div className="text-neutral-300 font-mono truncate">{connectedApi.url}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Records:</span>
                          <div className="text-neutral-300">{filteredData.length}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Columns:</span>
                          <div className="text-neutral-300">{getCurrentColumns().length}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Last Updated:</span>
                          <div className="text-neutral-300">{new Date().toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
