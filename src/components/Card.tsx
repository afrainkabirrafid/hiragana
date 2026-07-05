import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../utils';

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          'rounded-3xl p-6 border',
          glass 
            ? 'bg-white/5 backdrop-blur-xl border-white/10' 
            : 'bg-white/[0.03] backdrop-blur-md border-white/5',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
