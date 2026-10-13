import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealViewport, staggerChildren, variantsByName, type RevealVariant } from '@/lib/animations';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol';
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function StaggerContainer({ children, className, stagger = 0.12, delay = 0, as = 'div' }: StaggerContainerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={staggerChildren(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: 'div' | 'li' | 'article';
}

export function StaggerItem({ children, className, variant = 'fadeUp', as = 'div' }: StaggerItemProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variantsByName[variant]}>
      {children}
    </Component>
  );
}
