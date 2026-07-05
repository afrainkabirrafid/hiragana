import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../utils';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#E53935] text-white hover:bg-[#D32F2F] shadow-lg shadow-[#E53935]/20 transition-all hover:scale-105 active:scale-95',
      secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md',
      danger: 'bg-red-900/50 text-red-200 hover:bg-red-900/70 border border-red-800',
      ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-4 text-lg font-medium',
      icon: 'p-3',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
