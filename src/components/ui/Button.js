'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  // Base styles for all buttons
  base: "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:pointer-events-none",
  
  // Size variants
  sizes: {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
    xl: "h-12 px-8 text-lg"
  },
  
  // Style variants
  variants: {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
    secondary: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus:ring-neutral-500 border border-neutral-700 hover:border-neutral-600",
    outline: "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-500",
    ghost: "text-neutral-300 hover:text-white hover:bg-neutral-800 focus:ring-neutral-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    glow: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 glow-effect"
  }
};

const Button = forwardRef(({ 
  className = "", 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  animate = true,
  ...props 
}, ref) => {
  const baseClasses = buttonVariants.base;
  const sizeClasses = buttonVariants.sizes[size];
  const variantClasses = buttonVariants.variants[variant];
  
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  const buttonContent = (
    <>
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
