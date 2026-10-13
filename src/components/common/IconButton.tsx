import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { ButtonHTMLAttributes } from 'react';
import { softSpring } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface IconButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'aria-controls' | 'aria-expanded'> {
  icon: LucideIcon;
  label: string;
  className?: string;
  variant?: 'outline' | 'solid' | 'ghost';
}

const styles = {
  outline: 'border border-line bg-white text-navy shadow-card hover:border-primary hover:text-primary-700',
  solid: 'bg-primary-600 text-white hover:bg-primary-700',
  ghost: 'text-navy hover:bg-muted',
} as const;

/** Circular, 44px touch target icon button with an accessible label. */
export function IconButton({ icon: Icon, label, className, variant = 'outline', ...rest }: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.92 }}
      transition={softSpring}
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40',
        styles[variant],
        className,
      )}
      {...rest}
    >
      <Icon aria-hidden className="size-[1.125rem]" strokeWidth={2.2} />
    </motion.button>
  );
}
