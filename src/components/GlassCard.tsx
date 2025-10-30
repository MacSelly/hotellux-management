import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'intense' | 'subtle';
  hover?: boolean;
}

export function GlassCard({ children, className, variant = 'default', hover = false }: GlassCardProps) {
  const variantClasses = {
    default: 'glass-card',
    intense: 'glass-intense rounded-2xl',
    subtle: 'glass-subtle rounded-2xl',
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}
