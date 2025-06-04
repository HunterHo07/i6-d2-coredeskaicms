'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Zap, Database, BarChart3, Code, Globe, Cpu } from 'lucide-react';
import Button from '../ui/Button';
import DemoVideoModal from '../ui/DemoVideoModal';

const Hero = () => {
  const containerRef = useRef(null);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Matrix Digital Rain Effect
  const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Matrix characters
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|\\:;\"'<>,.?/~`";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = [];

      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      const draw = () => {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0ea5e9';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(14, 165, 233, ${Math.random() * 0.5 + 0.1})`;
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const animate = () => {
        draw();
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'transparent' }}
      />
    );
  };

  // Floating API Icons
  const FloatingIcons = () => {
    const icons = [
      { Icon: Database, delay: 0, x: "10%", y: "20%" },
      { Icon: Code, delay: 0.5, x: "80%", y: "30%" },
      { Icon: Globe, delay: 1, x: "15%", y: "70%" },
      { Icon: Cpu, delay: 1.5, x: "85%", y: "60%" },
      { Icon: BarChart3, delay: 2, x: "50%", y: "15%" },
      { Icon: Zap, delay: 2.5, x: "70%", y: "80%" }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.6],
              scale: [0, 1.2, 1, 1.1],
              rotate: [0, 360],
              y: [0, -20, 0, -10, 0]
            }}
            transition={{
              duration: 4,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Live Demo Preview Component
  const LiveDemoPreview = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 25 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative max-w-4xl mx-auto mt-16"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl" />

          {/* Demo window */}
          <div className="relative bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 rounded-2xl overflow-hidden">
            {/* Window header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-neutral-400 text-sm font-mono">CoreDeskAi Dashboard</div>
              <div className="w-16" />
            </div>

            {/* Demo content */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-blue-400 text-2xl font-bold">1,247</div>
                  <div className="text-neutral-400 text-sm">API Calls</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="text-green-400 text-2xl font-bold">98.9%</div>
                  <div className="text-neutral-400 text-sm">Uptime</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="text-purple-400 text-2xl font-bold">156ms</div>
                  <div className="text-neutral-400 text-sm">Avg Response</div>
                </div>
              </div>

              {/* Animated data rows */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.2 }}
                    className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-neutral-300">User #{1000 + i}</span>
                    </div>
                    <div className="text-neutral-400 text-sm">Active</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950/20"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Zero-Code API Integration
            </motion.div>
          </motion.div>

          {/* Main headline with typing effect */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Transform Any API
              </motion.span>
              <motion.span
                className="text-white block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Into a Powerful
              </motion.span>
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Admin Dashboard
              </motion.span>
            </h1>

            <motion.p
              className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              CoreDeskAi connects to any REST API via URL and token.
              <span className="text-blue-400 font-semibold"> No coding required.</span>
              Get your admin panel running in minutes, not months.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="glow"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg px-8 py-4"
              onClick={() => window.location.href = '/demo'}
            >
              Try Live Demo
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play className="w-5 h-5" />}
              className="text-lg px-8 py-4"
              onClick={() => setShowDemoVideo(true)}
            >
              Watch Demo Video
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div variants={itemVariants} className="pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Database, title: "Universal API Support", desc: "Works with any REST API endpoint", color: "blue" },
                { icon: Zap, title: "Instant Setup", desc: "Paste URL + token, get dashboard", color: "cyan" },
                { icon: BarChart3, title: "Real-time Analytics", desc: "Live data with export capabilities", color: "green" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-3"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`p-3 rounded-full bg-${feature.color}-500/10 border border-${feature.color}-500/20`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-neutral-400 text-center">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Demo Preview */}
          <LiveDemoPreview />

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-neutral-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-blue-500 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={showDemoVideo}
        onClose={() => setShowDemoVideo(false)}
      />
    </section>
  );
};

export default Hero;
