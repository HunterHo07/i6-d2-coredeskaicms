'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import Button from './Button';

const DemoVideoModal = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Demo steps simulation
  const demoSteps = [
    { time: 0, title: "Welcome to CoreDeskAi", description: "See how easy it is to create admin dashboards" },
    { time: 2, title: "Enter API URL", description: "Simply paste your REST API endpoint" },
    { time: 5, title: "Add Authentication", description: "Secure your connection with tokens" },
    { time: 8, title: "Auto-Detection", description: "We automatically analyze your data structure" },
    { time: 12, title: "Dashboard Generated", description: "Your admin panel is ready in seconds" },
    { time: 16, title: "Real-time Data", description: "Live updates and interactive features" },
    { time: 20, title: "Export & Share", description: "Download data in multiple formats" }
  ];

  // Simulate video progress
  useEffect(() => {
    let interval;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.5; // 0.5% per 100ms = 20 seconds total
          
          // Update current step based on progress
          const currentTime = (newProgress / 100) * 20; // 20 seconds total
          const step = demoSteps.findIndex((step, index) => {
            const nextStep = demoSteps[index + 1];
            return currentTime >= step.time && (!nextStep || currentTime < nextStep.time);
          });
          setCurrentStep(Math.max(0, step));
          
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, newProgress)));
      
      // Update current step
      const currentTime = (newProgress / 100) * 20;
      const step = demoSteps.findIndex((step, index) => {
        const nextStep = demoSteps[index + 1];
        return currentTime >= step.time && (!nextStep || currentTime < nextStep.time);
      });
      setCurrentStep(Math.max(0, step));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (progress / 100) * 20;
  const totalTime = 20;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div>
                <h2 className="text-2xl font-bold text-white">CoreDeskAi Demo</h2>
                <p className="text-neutral-400">See how easy it is to create admin dashboards</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-950/50 to-cyan-950/50">
              {/* Simulated Video Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  {/* Current Step Display */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-6xl mb-4">
                      {currentStep === 0 && "👋"}
                      {currentStep === 1 && "🔗"}
                      {currentStep === 2 && "🔐"}
                      {currentStep === 3 && "🤖"}
                      {currentStep === 4 && "✨"}
                      {currentStep === 5 && "📊"}
                      {currentStep === 6 && "📤"}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {demoSteps[currentStep]?.title}
                    </h3>
                    <p className="text-xl text-neutral-300 max-w-2xl">
                      {demoSteps[currentStep]?.description}
                    </p>
                  </motion.div>

                  {/* Demo UI Simulation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-md mx-auto"
                  >
                    {currentStep >= 1 && (
                      <div className="bg-neutral-800/50 backdrop-blur-sm rounded-lg p-4 border border-neutral-600">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          {currentStep >= 1 && (
                            <div className="bg-neutral-700 rounded p-2 text-sm text-neutral-300 font-mono">
                              https://api.yourservice.com/data
                            </div>
                          )}
                          {currentStep >= 2 && (
                            <div className="bg-neutral-700 rounded p-2 text-sm text-neutral-300 font-mono">
                              Bearer your-api-token
                            </div>
                          )}
                          {currentStep >= 4 && (
                            <div className="space-y-2">
                              <div className="h-2 bg-neutral-600 rounded"></div>
                              <div className="h-2 bg-neutral-600 rounded w-3/4"></div>
                              <div className="h-2 bg-neutral-600 rounded w-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div
                  ref={progressRef}
                  className="relative h-2 bg-neutral-700 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                  <motion.div
                    className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2"
                    style={{ left: `calc(${progress}% - 8px)` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalTime)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    leftIcon={isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Maximize2 className="w-4 h-4" />}
                  >
                    Fullscreen
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onClose();
                      // Navigate to demo page
                      window.location.href = '/demo';
                    }}
                  >
                    Try Live Demo
                  </Button>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-center space-x-2 pt-4">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newProgress = (demoSteps[index].time / 20) * 100;
                      setProgress(newProgress);
                      setCurrentStep(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-blue-500 w-8'
                        : index < currentStep
                        ? 'bg-blue-400'
                        : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoVideoModal;
