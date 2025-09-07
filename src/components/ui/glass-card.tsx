import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = false,
  onClick 
}) => {
  return (
    <div
      className={cn(
        "bg-glass-bg backdrop-blur-glass border border-glass-border rounded-2xl p-6",
        "shadow-glass transition-all duration-300",
        hover && "hover:bg-glass-hover hover:border-primary/30 hover:shadow-glow-primary",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};