import type { Transition, Variants } from 'motion/react';

/**
 * Shared motion vocabulary. Every animated element in the site draws from here,
 * so tuning timing in one place changes the feel everywhere.
 *
 * Only transform + opacity are animated (GPU-friendly, no layout shift).
 * Reduced-motion users get instant transitions via <MotionConfig reducedMotion="user">.
 */

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.7, ease: easeOut };

export const softSpring: Transition = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 };

/** Default viewport config for scroll reveals. */
export const revealViewport = { once: true, amount: 0.15 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOut } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const variantsByName = { fadeUp, fadeIn, slideLeft, slideRight, scaleIn } as const;
export type RevealVariant = keyof typeof variantsByName;

export function staggerChildren(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Card hover lift — use with whileHover="hover". */
export const hoverLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: softSpring },
};

/** Button micro-interactions. */
export const buttonMotion = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: softSpring,
} as const;

/** Hero entrance timeline. */
export const heroContainer: Variants = staggerChildren(0.14, 0.15);

export const heroLine: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

/** Modal / overlay presence. */
export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const dialogPop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeOut } },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.18 } },
};

/** Returns a copy of `variants` whose "visible" state starts after `delay` seconds. */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === 'function') return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
}
