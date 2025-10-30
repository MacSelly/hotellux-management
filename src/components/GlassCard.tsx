import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
}

export function GlassCard({ children, className, variant = 'default' }: GlassCardProps) {
  const baseClasses = 'backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl';
  
  const variantClasses = {
    default: 'bg-white/10 dark:bg-white/5',
    subtle: 'bg-white/5 dark:bg-white/[0.02]',
    intense: 'bg-white/20 dark:bg-white/10'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}