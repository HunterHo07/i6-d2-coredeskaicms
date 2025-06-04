'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Zap, 
  Users, 
  Shield, 
  Smartphone,
  Brain,
  Globe,
  Rocket,
  Star,
  Target,
  TrendingUp
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState('current');

  const roadmapPhases = {
    completed: {
      title: "MVP Foundation",
      period: "Q4 2024",
      status: "completed",
      description: "Core platform with essential features for early adopters",
      features: [
        { name: "REST API Integration", description: "Connect any REST API with URL + token", completed: true },
        { name: "Auto Schema Detection", description: "Automatically analyze API responses", completed: true },
        { name: "Basic Dashboard Generation", description: "Create tables and basic charts", completed: true },
        { name: "Data Export (CSV/Excel)", description: "Export data in multiple formats", completed: true },
        { name: "Real-time Data Sync", description: "Live data updates and refresh", completed: true },
        { name: "User Authentication", description: "Secure login and user management", completed: true }
      ],
      metrics: {
        users: "1,000+",
        apis: "500+",
        mrr: "$10K"
      }
    },
    current: {
      title: "Scale & Polish",
      period: "Q1 2025",
      status: "current",
      description: "Enhanced features and improved user experience",
      features: [
        { name: "Advanced Filtering & Search", description: "Powerful data filtering capabilities", completed: true },
        { name: "Custom Dashboard Layouts", description: "Drag-and-drop dashboard builder", completed: false },
        { name: "Scheduled Data Sync", description: "Cron jobs and automated updates", completed: false },
        { name: "Role-based Access Control", description: "Team permissions and access levels", completed: false },
        { name: "API Rate Limiting", description: "Smart rate limiting and optimization", completed: false },
        { name: "Dark/Light Mode", description: "Theme customization options", completed: false }
      ],
      metrics: {
        users: "5,000",
        apis: "2,000",
        mrr: "$50K"
      }
    },
    next: {
      title: "Enterprise Ready",
      period: "Q2 2025",
      status: "planned",
      description: "Enterprise features and white-label solutions",
      features: [
        { name: "White-label Branding", description: "Custom logos, colors, and domains", completed: false },
        { name: "SSO Integration", description: "SAML, OAuth, and enterprise auth", completed: false },
        { name: "Advanced Analytics", description: "Usage analytics and insights", completed: false },
        { name: "API Webhooks", description: "Real-time notifications and triggers", completed: false },
        { name: "Multi-tenant Architecture", description: "Isolated customer environments", completed: false },
        { name: "Priority Support", description: "Dedicated support for enterprise", completed: false }
      ],
      metrics: {
        users: "20,000",
        apis: "10,000",
        mrr: "$200K"
      }
    },
    future: {
      title: "AI-Powered Platform",
      period: "Q3-Q4 2025",
      status: "future",
      description: "AI-driven insights and automation",
      features: [
        { name: "AI Data Insights", description: "Automated pattern detection and alerts", completed: false },
        { name: "Smart Dashboard Suggestions", description: "AI-recommended dashboard layouts", completed: false },
        { name: "Natural Language Queries", description: "Ask questions about your data", completed: false },
        { name: "Predictive Analytics", description: "Forecast trends and anomalies", completed: false },
        { name: "Auto-generated Reports", description: "AI-written data summaries", completed: false },
        { name: "Mobile App", description: "Native iOS and Android apps", completed: false }
      ],
      metrics: {
        users: "100,000",
        apis: "50,000",
        mrr: "$1M"
      }
    }
  };

  const milestones = [
    { date: "Dec 2024", title: "MVP Launch", description: "First 1,000 users", status: "completed" },
    { date: "Mar 2025", title: "Series A Ready", description: "Product-market fit achieved", status: "current" },
    { date: "Jun 2025", title: "Enterprise Launch", description: "White-label partnerships", status: "planned" },
    { date: "Sep 2025", title: "AI Features", description: "Machine learning integration", status: "future" },
    { date: "Dec 2025", title: "Market Leader", description: "100K+ active users", status: "future" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'current': return 'blue';
      case 'planned': return 'yellow';
      case 'future': return 'purple';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'current': return <Zap className="w-5 h-5" />;
      case 'planned': return <Clock className="w-5 h-5" />;
      case 'future': return <Star className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-purple-950/30 to-blue-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="text-white">Product</span>
                <br />
                <span className="gradient-text">Roadmap</span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
                Our journey to becoming the world's leading universal admin dashboard platform. 
                See what we've built, what we're building, and what's coming next.
              </p>
              <Button
                variant="glow"
                size="lg"
                onClick={() => window.location.href = '/signup'}
              >
                Request Feature
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Timeline Navigation */}
        <section className="py-12 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(roadmapPhases).map(([key, phase]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedPhase(key)}
                  className={`px-6 py-3 rounded-lg border transition-all ${
                    selectedPhase === key
                      ? `border-${getStatusColor(phase.status)}-500 bg-${getStatusColor(phase.status)}-500/10`
                      : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`text-${getStatusColor(phase.status)}-400`}>
                      {getStatusIcon(phase.status)}
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">{phase.title}</div>
                      <div className="text-neutral-400 text-sm">{phase.period}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Phase Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={selectedPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-2">
                        {roadmapPhases[selectedPhase].title}
                      </CardTitle>
                      <p className="text-neutral-400">{roadmapPhases[selectedPhase].description}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-${getStatusColor(roadmapPhases[selectedPhase].status)}-500/10 border border-${getStatusColor(roadmapPhases[selectedPhase].status)}-500/20`}>
                      <span className={`text-${getStatusColor(roadmapPhases[selectedPhase].status)}-400 font-medium`}>
                        {roadmapPhases[selectedPhase].period}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {roadmapPhases[selectedPhase].metrics.users}
                      </div>
                      <div className="text-neutral-400 text-sm">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {roadmapPhases[selectedPhase].metrics.apis}
                      </div>
                      <div className="text-neutral-400 text-sm">APIs Connected</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {roadmapPhases[selectedPhase].metrics.mrr}
                      </div>
                      <div className="text-neutral-400 text-sm">Monthly Revenue</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {roadmapPhases[selectedPhase].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          feature.completed 
                            ? 'bg-green-500/10 border-green-500/20' 
                            : 'bg-neutral-800/50 border-neutral-700'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 ${
                            feature.completed ? 'text-green-400' : 'text-neutral-400'
                          }`}>
                            {feature.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{feature.name}</h4>
                            <p className="text-neutral-400 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-16 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Key Milestones
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Major achievements and upcoming goals on our journey to market leadership
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full" />
              
              {/* Milestones */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card variant="glass">
                        <CardContent className="p-6">
                          <div className="text-neutral-400 text-sm mb-2">{milestone.date}</div>
                          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                          <p className="text-neutral-300">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full border-4 border-${getStatusColor(milestone.status)}-500 bg-neutral-950 flex items-center justify-center`}>
                        <div className={`text-${getStatusColor(milestone.status)}-400`}>
                          {getStatusIcon(milestone.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Feedback */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Shape Our Future
                  </h2>
                  <p className="text-xl text-neutral-300 mb-8">
                    Your feedback drives our roadmap. Tell us what features matter most to your team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="glow"
                      size="lg"
                      onClick={() => window.location.href = '/signup'}
                    >
                      Request Feature
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.location.href = '/demo'}
                    >
                      Join Beta Program
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
