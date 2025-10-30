import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
}

export function GlassCard({ children, className, variant = 'default' }: GlassCardProps) {
  const baseClasses = 'backdrop-blur-xl shadow-xl rounded-2xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-slate-700/30',
    subtle: 'bg-white/5 dark:bg-slate-800/10 border border-white/10 dark:border-slate-700/20',
    intense: 'bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/40'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}