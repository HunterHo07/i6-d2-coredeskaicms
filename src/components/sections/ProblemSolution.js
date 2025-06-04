'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Clock, Code, DollarSign, Zap, Database, BarChart3, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Months of Development Time",
      description: "Custom admin panels take 2-6 months to build, delaying product launches and eating into budgets.",
      stat: "2-6 months"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer Dependency",
      description: "Business teams wait for developers to create internal tools, creating bottlenecks and delays.",
      stat: "40% dev time"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "High Development Costs",
      description: "Building custom dashboards costs $50K-200K per project, making it expensive for startups.",
      stat: "$50K-200K"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Maintenance Overhead",
      description: "API changes break custom integrations, requiring constant updates and technical debt.",
      stat: "Ongoing costs"
    }
  ];

  const solutions = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Setup",
      description: "Paste any REST API URL + token and get a fully functional admin dashboard in minutes.",
      benefit: "95% faster"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Universal Compatibility",
      description: "Works with any REST API - Web3, SaaS, gaming, financial services, or custom backends.",
      benefit: "Any API"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Live data visualization, filtering, search, and Excel export capabilities built-in.",
      benefit: "Zero coding"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "No Maintenance",
      description: "Automatic adaptation to API changes with scheduled sync and error handling.",
      benefit: "Self-healing"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-red-400">The Problem</span> vs{" "}
              <span className="gradient-text">Our Solution</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Traditional admin dashboard development is broken. We've built the future.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problems Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-red-400 mb-4 flex items-center justify-center lg:justify-start">
                <AlertTriangle className="w-8 h-8 mr-3" />
                Current Problems
              </h3>
              <p className="text-neutral-400">
                Why traditional admin dashboard development fails businesses
              </p>
            </motion.div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card variant="default" className="border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex-shrink-0">
                          {problem.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{problem.title}</h4>
                            <span className="text-sm font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded">
                              {problem.stat}
                            </span>
                          </div>
                          <p className="text-neutral-400">{problem.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h3 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center lg:justify-start">
                <CheckCircle className="w-8 h-8 mr-3" />
                CoreDeskAi Solution
              </h3>
              <p className="text-neutral-400">
                How we solve these problems with zero-code innovation
              </p>
            </motion.div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card variant="glow" className="border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex-shrink-0">
                          {solution.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{solution.title}</h4>
                            <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                              {solution.benefit}
                            </span>
                          </div>
                          <p className="text-neutral-400">{solution.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30">
            <Zap className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium">
              Ready to transform your workflow? Try our live demo below.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
