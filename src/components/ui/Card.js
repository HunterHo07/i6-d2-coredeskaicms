'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  // Base styles
  base: "rounded-xl border transition-all duration-200",
  
  // Style variants
  variants: {
    default: "bg-neutral-900/50 border-neutral-800 backdrop-blur-sm",
    glass: "bg-neutral-900/30 border-neutral-700/50 backdrop-blur-md glass-effect",
    solid: "bg-neutral-900 border-neutral-800",
    gradient: "bg-gradient-to-br from-neutral-900 to-neutral-800 border-neutral-700",
    glow: "bg-neutral-900/50 border-blue-500/30 backdrop-blur-sm glow-effect",
    hover: "bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
  },
  
  // Size variants
  sizes: {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  }
};

const Card = forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "md", 
  children, 
  animate = true,
  hover = false,
  ...props 
}, ref) => {
  const baseClasses = cardVariants.base;
  const variantClasses = cardVariants.variants[variant];
  const sizeClasses = cardVariants.sizes[size];
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={combinedClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={combinedClasses}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

// Card Header Component
const CardHeader = forwardRef(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 pb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

// Card Title Component
const CardTitle = forwardRef(({ className = "", children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-xl font-semibold leading-none tracking-tight text-neutral-100 ${className}`}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

// Card Description Component
const CardDescription = forwardRef(({ className = "", children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-neutral-400 ${className}`}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

// Card Content Component
const CardContent = forwardRef(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`${className}`}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = "CardContent";

// Card Footer Component
const CardFooter = forwardRef(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center pt-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
