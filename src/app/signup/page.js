'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Building, 
  CheckCircle, 
  ArrowRight,
  Github,
  Chrome,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, FormField } from '@/components/ui/Input';

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    useCase: '',
    apiUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { number: 1, title: "Account Details", description: "Create your CoreDeskAi account" },
    { number: 2, title: "Profile Info", description: "Tell us about yourself" },
    { number: 3, title: "Use Case", description: "How will you use CoreDeskAi?" },
    { number: 4, title: "Success!", description: "Welcome to CoreDeskAi" }
  ];

  const useCases = [
    { id: 'web3', title: 'Web3 & Blockchain', description: 'DeFi protocols, NFT marketplaces, crypto exchanges' },
    { id: 'gaming', title: 'Gaming & Casino', description: 'Player analytics, transaction monitoring' },
    { id: 'saas', title: 'SaaS & Tech', description: 'Customer data, usage analytics, support systems' },
    { id: 'fintech', title: 'Financial Services', description: 'Multi-source data, compliance, risk management' },
    { id: 'ecommerce', title: 'E-commerce', description: 'Inventory, orders, customer analytics' },
    { id: 'other', title: 'Other', description: 'Custom use case or industry' }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "5-Minute Setup", description: "Get your dashboard running instantly" },
    { icon: <Shield className="w-5 h-5" />, title: "Enterprise Security", description: "SOC2 compliant with encryption" },
    { icon: <Globe className="w-5 h-5" />, title: "Any REST API", description: "Universal compatibility guaranteed" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.company) newErrors.company = 'Company is required';
    }

    if (step === 3) {
      if (!formData.useCase) newErrors.useCase = 'Please select a use case';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(4);
        }, 2000);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-neutral-400">Join thousands of teams using CoreDeskAi</p>
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleSocialSignup('google')}
                leftIcon={<Chrome className="w-5 h-5" />}
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleSocialSignup('github')}
                leftIcon={<Github className="w-5 h-5" />}
              >
                Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-950 text-neutral-400">Or continue with email</span>
              </div>
            </div>

            {/* Email Signup */}
            <div className="space-y-4">
              <FormField
                label="Email Address"
                required
                error={errors.email}
              >
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={!!errors.email}
                />
              </FormField>

              <FormField
                label="Password"
                required
                error={errors.password}
              >
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={!!errors.password}
                />
              </FormField>

              <FormField
                label="Confirm Password"
                required
                error={errors.confirmPassword}
              >
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={!!errors.confirmPassword}
                />
              </FormField>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Yourself</h2>
              <p className="text-neutral-400">Help us personalize your experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                label="First Name"
                required
                error={errors.firstName}
              >
                <Input
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  error={!!errors.firstName}
                />
              </FormField>

              <FormField
                label="Last Name"
                required
                error={errors.lastName}
              >
                <Input
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  error={!!errors.lastName}
                />
              </FormField>
            </div>

            <FormField
              label="Company"
              required
              error={errors.company}
            >
              <Input
                placeholder="Your Company Name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                leftIcon={<Building className="w-4 h-4" />}
                error={!!errors.company}
              />
            </FormField>

            <FormField label="Role (Optional)">
              <Input
                placeholder="e.g., CTO, Product Manager, Developer"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </FormField>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">How Will You Use CoreDeskAi?</h2>
              <p className="text-neutral-400">This helps us customize your dashboard experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <motion.button
                  key={useCase.id}
                  onClick={() => handleInputChange('useCase', useCase.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.useCase === useCase.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="font-semibold text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-neutral-400">{useCase.description}</p>
                </motion.button>
              ))}
            </div>

            {errors.useCase && (
              <p className="text-red-400 text-sm">{errors.useCase}</p>
            )}

            <FormField label="API URL (Optional)">
              <Input
                placeholder="https://api.yourcompany.com/data"
                value={formData.apiUrl}
                onChange={(e) => handleInputChange('apiUrl', e.target.value)}
                leftIcon={<Globe className="w-4 h-4" />}
              />
            </FormField>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to CoreDeskAi!</h2>
              <p className="text-xl text-neutral-300 mb-2">
                Hi {formData.firstName}, your account has been created successfully.
              </p>
              <p className="text-neutral-400">
                We've sent a verification email to {formData.email}
              </p>
            </div>

            <div className="space-y-4">
              <Button variant="glow" size="lg" className="w-full">
                Go to Dashboard
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Start with Demo Data
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit mx-auto mb-3">
                    <div className="text-blue-400">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{benefit.title}</h3>
                  <p className="text-neutral-400 text-xs">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <main className="pt-16">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Progress Steps */}
            {currentStep < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {steps.slice(0, 3).map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.number
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      {index < 2 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step.number ? 'bg-blue-500' : 'bg-neutral-800'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-semibold text-white">
                    {steps[currentStep - 1].title}
                  </h1>
                  <p className="text-neutral-400 text-sm">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>
            )}

            {/* Form Card */}
            <Card variant="glass">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                {currentStep < 4 && (
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      disabled={currentStep === 1}
                    >
                      Back
                    </Button>
                    <Button
                      variant="glow"
                      onClick={handleNext}
                      loading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {currentStep === 3 ? 'Create Account' : 'Continue'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Login Link */}
            {currentStep < 4 && (
              <p className="mt-6 text-center text-neutral-400">
                Already have an account?{' '}
                <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign in
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
