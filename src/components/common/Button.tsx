import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router';
import { buttonMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline-light' | 'outline' | 'white';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgb(54_134_24/0.8)] hover:bg-primary-700 focus-visible:outline-primary-400',
  'outline-light': 'border-2 border-white/90 text-white hover:bg-white hover:text-navy',
  outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white',
  white: 'bg-white text-navy hover:bg-primary-50',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.8125rem] gap-2',
  md: 'h-12 px-6 text-sm gap-2.5',
  lg: 'h-13 px-7 text-[0.9375rem] gap-3',
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  /** Animate the trailing icon to the right on hover (arrows). */
  nudgeIcon?: boolean;
  className?: string;
  ariaLabel?: string;
  /** For disclosure buttons (rendered as <button> only). */
  ariaExpanded?: boolean;
  ariaControls?: string;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never; disabled?: never }
    | { href: string; to?: never; onClick?: never; type?: never; disabled?: never }
    | {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        type?: 'button' | 'submit';
        disabled?: boolean;
        to?: never;
        href?: never;
      }
  );

const MotionLink = motion.create(Link);

/** Pill button that renders as a router Link, external anchor or <button>. */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', icon: Icon, nudgeIcon = true, className, ariaLabel, ariaExpanded, ariaControls } =
    props;

  const classes = cn(
    'group inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap',
    'transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          className={cn(
            'size-4 shrink-0 transition-transform duration-200',
            nudgeIcon && 'group-hover:translate-x-1',
          )}
          strokeWidth={2.4}
        />
      )}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    return (
      <MotionLink to={props.to} className={classes} aria-label={ariaLabel} {...buttonMotion}>
        {content}
      </MotionLink>
    );
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <motion.a href={props.href} className={classes} aria-label={ariaLabel} {...buttonMotion}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...buttonMotion}
    >
      {content}
    </motion.button>
  );
}
