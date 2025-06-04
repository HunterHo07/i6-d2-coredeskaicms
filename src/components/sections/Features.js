'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Database, 
  Zap, 
  BarChart3, 
  Download, 
  Clock, 
  Shield, 
  Smartphone, 
  Palette,
  Search,
  Filter,
  RefreshCw,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainFeatures = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Universal API Support",
      description: "Connect to any REST API endpoint with just URL and token. Works with Web3, SaaS, gaming, financial services, and custom backends.",
      highlights: ["REST API Compatible", "OAuth & Bearer Tokens", "Custom Headers Support", "Rate Limiting Aware"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Dashboard Generation",
      description: "Automatically analyze API responses and generate beautiful, functional admin panels in seconds, not months.",
      highlights: ["Auto Schema Detection", "Smart Column Mapping", "Responsive Layouts", "Zero Configuration"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Data Visualization",
      description: "Live charts, tables, and analytics with automatic updates. Filter, search, and sort your data with powerful built-in tools.",
      highlights: ["Live Data Updates", "Interactive Charts", "Advanced Filtering", "Custom Views"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Capabilities",
      description: "Export data to Excel, CSV, or PDF with custom formatting and scheduling."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Scheduled Sync",
      description: "Automatic data fetching with cron jobs and real-time webhook support."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "SOC2 compliant with encryption, audit logs, and role-based access."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Fully responsive design that works perfectly on all devices."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Branding",
      description: "White-label options with custom themes, logos, and domain names."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Search",
      description: "Full-text search, filters, and saved queries for quick data access."
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Smart Filtering",
      description: "Dynamic filters based on data types with date ranges and conditions."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Auto Refresh",
      description: "Configurable refresh intervals with real-time data synchronization."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Workflows",
      description: "Build automated workflows and triggers based on data conditions."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
              <br />
              <span className="text-white">Built for Modern Teams</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Everything you need to transform any API into a production-ready admin dashboard. 
              No coding, no complexity, just results.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                variant="glass" 
                hover={true}
                className="h-full border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              And Much More
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Comprehensive features designed to handle any admin dashboard requirement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card variant="default" className="h-full hover:border-neutral-600 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-neutral-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <Card variant="gradient" className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Choose CoreDeskAi?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-neutral-300">Faster Setup</div>
                  <div className="text-sm text-neutral-400">vs Custom Development</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">$0</div>
                  <div className="text-neutral-300">Developer Costs</div>
                  <div className="text-sm text-neutral-400">No coding required</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                  <div className="text-neutral-300">API Compatible</div>
                  <div className="text-sm text-neutral-400">Works with any REST API</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
