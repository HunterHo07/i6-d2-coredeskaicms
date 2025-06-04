'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const inputVariants = {
  base: "flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  
  variants: {
    default: "border-neutral-700 bg-neutral-900/50 text-neutral-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
    error: "border-red-500 bg-neutral-900/50 text-neutral-100 focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
    success: "border-green-500 bg-neutral-900/50 text-neutral-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
    ghost: "border-transparent bg-neutral-800/50 text-neutral-100 focus:border-blue-500 focus:bg-neutral-900/50"
  },
  
  sizes: {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-11 px-4 text-base"
  }
};

const Input = forwardRef(({ 
  className = "", 
  type = "text", 
  variant = "default", 
  size = "md",
  error,
  success,
  leftIcon,
  rightIcon,
  animate = true,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  
  // Determine variant based on state
  let currentVariant = variant;
  if (error) currentVariant = "error";
  if (success) currentVariant = "success";
  
  const baseClasses = inputVariants.base;
  const variantClasses = inputVariants.variants[currentVariant];
  const sizeClasses = inputVariants.sizes[size];
  
  const hasIcons = leftIcon || rightIcon || isPassword;
  const paddingClasses = hasIcons ? "pl-10 pr-10" : "";
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${paddingClasses} ${className}`;

  const inputElement = (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
          {leftIcon}
        </div>
      )}
      
      <input
        ref={ref}
        type={inputType}
        className={combinedClasses}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
      
      {rightIcon && !isPassword && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
          {rightIcon}
        </div>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {inputElement}
      </motion.div>
    );
  }

  return inputElement;
});

Input.displayName = "Input";

// Label Component
const Label = forwardRef(({ className = "", children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium text-neutral-200 ${className}`}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
));

Label.displayName = "Label";

// Form Field Component
const FormField = ({ label, error, success, required, children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {label && (
      <Label required={required}>
        {label}
      </Label>
    )}
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-400"
      >
        {error}
      </motion.p>
    )}
    {success && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-green-400"
      >
        {success}
      </motion.p>
    )}
  </div>
);

// Textarea Component
const Textarea = forwardRef(({ 
  className = "", 
  variant = "default", 
  error,
  success,
  animate = true,
  ...props 
}, ref) => {
  // Determine variant based on state
  let currentVariant = variant;
  if (error) currentVariant = "error";
  if (success) currentVariant = "success";
  
  const baseClasses = "flex min-h-[80px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none";
  const variantClasses = inputVariants.variants[currentVariant];
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const textareaElement = (
    <textarea
      ref={ref}
      className={combinedClasses}
      {...props}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {textareaElement}
      </motion.div>
    );
  }

  return textareaElement;
});

Textarea.displayName = "Textarea";

export { Input, Label, FormField, Textarea };
