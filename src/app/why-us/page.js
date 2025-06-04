'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Clock, 
  DollarSign,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Code,
  Database
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function WhyUsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const advantages = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "95% Faster Setup",
      description: "While competitors take months to implement, CoreDeskAi gets you running in minutes. Just paste your API URL and token.",
      comparison: "Competitors: 2-6 months | CoreDeskAi: 5 minutes",
      color: "blue"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "99% Cost Reduction",
      description: "Custom dashboard development costs $50K-200K. Our solution starts at $49/month with no setup fees.",
      comparison: "Custom Dev: $50K-200K | CoreDeskAi: $49/month",
      color: "green"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Zero Code Required",
      description: "No developers needed. Business teams can create and manage dashboards independently.",
      comparison: "Competitors: Require developers | CoreDeskAi: Business-friendly",
      color: "purple"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Universal API Support",
      description: "Works with any REST API - Web3, SaaS, gaming, financial services. No limitations.",
      comparison: "Competitors: Limited integrations | CoreDeskAi: Any REST API",
      color: "cyan"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, DeFi Protocol",
      company: "CryptoFlow",
      content: "CoreDeskAi saved us 4 months of development time. We went from API to dashboard in 10 minutes. Incredible!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Operations",
      company: "GameVault Casino",
      content: "Finally, a solution that doesn't require our dev team. Our ops team can now create dashboards for any data source.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Founder",
      company: "FinTech Startup",
      content: "The ROI is insane. We're saving $100K+ per year on dashboard development while getting better functionality.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const stats = [
    { value: "10,000+", label: "APIs Connected", icon: <Globe className="w-6 h-6" /> },
    { value: "99.9%", label: "Uptime SLA", icon: <Shield className="w-6 h-6" /> },
    { value: "< 2min", label: "Average Setup", icon: <Clock className="w-6 h-6" /> },
    { value: "500+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> }
  ];

  const competitors = [
    {
      name: "Retool",
      setup: "Complex",
      cost: "$50+/user/month",
      coding: "Required",
      apis: "Limited",
      time: "Weeks"
    },
    {
      name: "Metabase",
      setup: "Database only",
      cost: "$85/user/month",
      coding: "SQL required",
      apis: "None",
      time: "Days"
    },
    {
      name: "Custom Dev",
      setup: "Full project",
      cost: "$50K-200K",
      coding: "Heavy",
      apis: "Custom only",
      time: "Months"
    },
    {
      name: "CoreDeskAi",
      setup: "Paste URL",
      cost: "$49/workspace",
      coding: "Zero",
      apis: "Any REST API",
      time: "Minutes"
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
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-950/30 to-cyan-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="text-white">Why Choose</span>
                <br />
                <span className="gradient-text">CoreDeskAi?</span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
                We're not just another dashboard tool. We're the future of admin panel development - 
                faster, cheaper, and infinitely more flexible than anything else on the market.
              </p>
              <Button variant="glow" size="lg">
                See Live Comparison
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Key Advantages */}
        <section ref={ref} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our Competitive Advantages
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  See why leading companies choose CoreDeskAi over traditional solutions
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-8 mb-16"
            >
              {advantages.map((advantage, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="glass" hover={true} className="h-full">
                    <CardHeader>
                      <div className={`p-3 rounded-lg bg-${advantage.color}-500/10 border border-${advantage.color}-500/20 text-${advantage.color}-400 w-fit mb-4`}>
                        {advantage.icon}
                      </div>
                      <CardTitle className="text-2xl">{advantage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-300 mb-4">{advantage.description}</p>
                      <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                        <p className="text-sm text-neutral-400 font-mono">{advantage.comparison}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit mx-auto mb-4">
                    <div className="text-blue-400">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-neutral-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                How We Stack Up
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Direct comparison with leading alternatives
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-700">
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">Solution</th>
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">Setup</th>
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">Cost</th>
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">Coding</th>
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">API Support</th>
                          <th className="text-left py-4 px-6 text-neutral-300 font-medium">Time to Deploy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitors.map((competitor, index) => (
                          <tr 
                            key={index} 
                            className={`border-b border-neutral-800 ${
                              competitor.name === 'CoreDeskAi' 
                                ? 'bg-blue-500/10 border-blue-500/20' 
                                : 'hover:bg-neutral-800/50'
                            }`}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                {competitor.name === 'CoreDeskAi' && (
                                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                )}
                                <span className={competitor.name === 'CoreDeskAi' ? 'text-blue-400 font-bold' : 'text-white'}>
                                  {competitor.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-neutral-300">{competitor.setup}</td>
                            <td className="py-4 px-6 text-neutral-300">{competitor.cost}</td>
                            <td className="py-4 px-6 text-neutral-300">{competitor.coding}</td>
                            <td className="py-4 px-6 text-neutral-300">{competitor.apis}</td>
                            <td className="py-4 px-6 text-neutral-300">{competitor.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Real feedback from companies using CoreDeskAi in production
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="glass" hover={true} className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-neutral-300 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-neutral-400 text-sm">{testimonial.role}</div>
                          <div className="text-blue-400 text-sm">{testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
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
                    Ready to Experience the Difference?
                  </h2>
                  <p className="text-xl text-neutral-300 mb-8">
                    Join thousands of companies who've already made the switch to CoreDeskAi
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="glow"
                      size="lg"
                      onClick={() => window.location.href = '/demo'}
                    >
                      Start Free Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.location.href = '/signup'}
                    >
                      Schedule Demo Call
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
