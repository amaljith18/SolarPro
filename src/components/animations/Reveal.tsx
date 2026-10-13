import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealViewport, variantsByName, withDelay, type RevealVariant } from '@/lib/animations';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/** Animates its children into view once, when scrolled into the viewport. */
export function Reveal({ children, variant = 'fadeUp', delay = 0, className, as = 'div' }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={withDelay(variantsByName[variant], delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}
