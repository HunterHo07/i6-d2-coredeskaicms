'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star, Zap, Crown, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Demo",
      icon: <Zap className="w-6 h-6" />,
      price: "Free",
      period: "Forever",
      description: "Perfect for testing and proof of concept",
      popular: false,
      features: [
        "1 API connection",
        "1,000 records limit",
        "24-hour data retention",
        "Basic dashboard",
        "CSV export",
        "Community support"
      ],
      limitations: [
        "Limited to demo data",
        "No custom branding",
        "Basic features only"
      ],
      cta: "Start Free Demo",
      variant: "outline"
    },
    {
      name: "Professional",
      icon: <Star className="w-6 h-6" />,
      price: "$49",
      period: "per workspace/month",
      description: "For growing teams and small businesses",
      popular: true,
      features: [
        "5 API connections",
        "Unlimited records",
        "30-day data retention",
        "Advanced dashboard",
        "Excel/CSV/PDF export",
        "Scheduled sync (hourly)",
        "Email support",
        "Custom filters",
        "Real-time updates"
      ],
      limitations: [],
      cta: "Start Professional",
      variant: "glow"
    },
    {
      name: "Enterprise",
      icon: <Crown className="w-6 h-6" />,
      price: "$199",
      period: "per workspace/month",
      description: "For large organizations with advanced needs",
      popular: false,
      features: [
        "Unlimited API connections",
        "Unlimited records",
        "Custom data retention",
        "White-label branding",
        "SSO integration",
        "Priority support",
        "Custom webhooks",
        "Advanced analytics",
        "Role-based access",
        "API rate optimization",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Contact Sales",
      variant: "secondary"
    },
    {
      name: "White-Label",
      icon: <Building className="w-6 h-6" />,
      price: "$999",
      period: "per month + revenue share",
      description: "For agencies and software vendors",
      popular: false,
      features: [
        "Full platform access",
        "Multi-tenant architecture",
        "Custom domain",
        "Your branding",
        "Reseller program",
        "Dedicated support",
        "Custom features",
        "Revenue sharing",
        "Partner portal",
        "Training & onboarding"
      ],
      limitations: [],
      cta: "Partner With Us",
      variant: "primary"
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950">
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
              <span className="gradient-text">Simple, Transparent</span>
              <br />
              <span className="text-white">Pricing</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free, scale as you grow.
              No hidden fees, no surprises.
            </p>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-4 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card 
                variant={plan.popular ? "glow" : "glass"}
                className={`h-full ${plan.popular ? 'border-blue-500/40 scale-105' : 'border-neutral-700'} transition-all duration-300`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`p-3 rounded-lg w-fit mx-auto mb-4 ${
                    plan.popular 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' 
                      : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-white">{plan.price}</div>
                    <div className="text-neutral-400 text-sm mt-1">{plan.period}</div>
                  </div>
                  <p className="text-neutral-400 mt-4">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full mb-6"
                    onClick={() => {
                      if (plan.name === 'Demo') {
                        window.location.href = '/demo';
                      } else {
                        window.location.href = '/signup';
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-neutral-300">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center text-sm opacity-60">
                        <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                          <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                        </div>
                        <span className="text-neutral-400">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <Card variant="default" className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-white mb-2">Can I change plans anytime?</h4>
                  <p className="text-neutral-400 text-sm">Yes, upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What APIs are supported?</h4>
                  <p className="text-neutral-400 text-sm">Any REST API with JSON responses. We support OAuth, Bearer tokens, and custom headers.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Is there a setup fee?</h4>
                  <p className="text-neutral-400 text-sm">No setup fees, no hidden costs. Pay only for what you use with transparent pricing.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Do you offer refunds?</h4>
                  <p className="text-neutral-400 text-sm">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
