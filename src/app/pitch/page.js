'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Zap,
  Shield,
  Globe,
  Rocket
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "CoreDeskAi",
      subtitle: "Universal Admin Dashboard Platform",
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-8">🚀</div>
          <h1 className="text-5xl font-bold gradient-text mb-4">CoreDeskAi</h1>
          <p className="text-2xl text-neutral-300 mb-8">
            Transform any REST API into a powerful admin dashboard in minutes
          </p>
          <div className="text-lg text-neutral-400">
            "Your Data. Your Dashboard. Zero Code."
          </div>
        </div>
      )
    },
    {
      title: "The Problem",
      subtitle: "Admin Dashboard Development is Broken",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">The Problem</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">2-6 Months</h3>
                <p className="text-neutral-300">Development time for custom admin panels</p>
              </div>
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">$50K-200K</h3>
                <p className="text-neutral-300">Cost per custom dashboard project</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">40%</h3>
                <p className="text-neutral-300">Developer time spent on internal tools</p>
              </div>
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">Ongoing</h3>
                <p className="text-neutral-300">Maintenance costs and technical debt</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Our Solution",
      subtitle: "Zero-Code API Dashboard Generation",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <Zap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold gradient-text mb-4">Our Solution</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Setup</h3>
              <p className="text-neutral-300">Paste URL + token, get dashboard in minutes</p>
            </div>
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-white mb-2">Universal API</h3>
              <p className="text-neutral-300">Works with any REST API endpoint</p>
            </div>
            <div className="text-center p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Data</h3>
              <p className="text-neutral-300">Live analytics with export capabilities</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "$850M Addressable Market",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Market Opportunity</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="text-2xl font-bold text-green-400 mb-2">$4.2B</h3>
                <p className="text-neutral-300">Global Admin Dashboard Market</p>
              </div>
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">$21.2B</h3>
                <p className="text-neutral-300">No-Code/Low-Code Market (28% CAGR)</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">$5.1B</h3>
                <p className="text-neutral-300">API Management Market (25% CAGR)</p>
              </div>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">$850M</h3>
                <p className="text-neutral-300">Our Target Addressable Market</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Target Customers",
      subtitle: "High-Growth Markets with Immediate Need",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Target Customers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Web3 & Blockchain</h3>
                <p className="text-neutral-300">DeFi protocols, NFT marketplaces, crypto exchanges</p>
                <div className="text-sm text-neutral-400 mt-2">Market: $180B</div>
              </div>
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Gaming & Casino</h3>
                <p className="text-neutral-300">Player analytics, transaction monitoring, compliance</p>
                <div className="text-sm text-neutral-400 mt-2">Market: $321B</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">SaaS & Tech Startups</h3>
                <p className="text-neutral-300">Customer data, usage analytics, support systems</p>
                <div className="text-sm text-neutral-400 mt-2">Market: $195B</div>
              </div>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Financial Services</h3>
                <p className="text-neutral-300">Multi-source data, compliance, risk management</p>
                <div className="text-sm text-neutral-400 mt-2">Market: $26.5T</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      subtitle: "Scalable SaaS with Multiple Revenue Streams",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Business Model</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-2">Demo - Free</h3>
                <p className="text-neutral-300">1 API, 1K records, 24h retention</p>
                <div className="text-green-400 font-bold mt-2">Lead Generation</div>
              </div>
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Professional - $49/mo</h3>
                <p className="text-neutral-300">5 APIs, unlimited records, 30-day retention</p>
                <div className="text-green-400 font-bold mt-2">Primary Revenue</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Enterprise - $199/mo</h3>
                <p className="text-neutral-300">Unlimited APIs, white-label, SSO</p>
                <div className="text-green-400 font-bold mt-2">High-Value Customers</div>
              </div>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">White-Label - $999/mo</h3>
                <p className="text-neutral-300">Full platform, multi-tenant, revenue share</p>
                <div className="text-green-400 font-bold mt-2">Partner Channel</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      subtitle: "Why We Win",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold gradient-text mb-4">Competitive Advantage</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Zero-Code Setup</h3>
                <p className="text-neutral-300">Competitors require developers, we don't</p>
              </div>
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Universal Compatibility</h3>
                <p className="text-neutral-300">Works with any REST API, not just databases</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">95% Cost Reduction</h3>
                <p className="text-neutral-300">$49/month vs $50K-200K custom development</p>
              </div>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Instant Deployment</h3>
                <p className="text-neutral-300">Minutes vs months for dashboard creation</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Roadmap",
      subtitle: "Path to Market Leadership",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Roadmap</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">Q1</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-bold text-white">MVP Launch</h3>
                <p className="text-neutral-300">Core features, 1000 users, $10K MRR</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">Q2</div>
              <div className="flex-1 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="font-bold text-white">Scale & Features</h3>
                <p className="text-neutral-300">Advanced analytics, 5K users, $50K MRR</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">Q3</div>
              <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="font-bold text-white">Enterprise & Partnerships</h3>
                <p className="text-neutral-300">White-label, 20K users, $200K MRR</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">Q4</div>
              <div className="flex-1 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="font-bold text-white">Market Leadership</h3>
                <p className="text-neutral-300">AI features, 100K users, $1M MRR</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Ask",
      subtitle: "Join Us in Revolutionizing Admin Dashboards",
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-8">🤝</div>
          <h2 className="text-4xl font-bold gradient-text mb-4">The Ask</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Seeking $2M Seed Round</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Use of Funds:</h4>
                  <ul className="text-neutral-300 space-y-1">
                    <li>• Product development (40%)</li>
                    <li>• Sales & marketing (35%)</li>
                    <li>• Team expansion (25%)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">18-Month Goals:</h4>
                  <ul className="text-neutral-300 space-y-1">
                    <li>• 50K active users</li>
                    <li>• $500K MRR</li>
                    <li>• Series A readiness</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-lg text-neutral-300">
              Ready to transform how the world builds admin dashboards?
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <main className="pt-16">
        {/* Slide Container */}
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="min-h-[600px] flex items-center"
              >
                <Card variant="glass" className="w-full">
                  <CardContent className="p-12">
                    {slides[currentSlide].content}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-4 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 rounded-full px-6 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-500 w-8' : 'bg-neutral-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="fixed top-24 right-8 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 rounded-lg px-4 py-2">
          <span className="text-neutral-300 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </main>
    </div>
  );
}
