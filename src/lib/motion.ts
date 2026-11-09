import type { Variants } from 'framer-motion';

/** Reusable cubic-bezier — smooth professional easing */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const cardHover = {
  whileHover: { y: -6, boxShadow: '0 20px 50px -12px rgba(16, 185, 129, 0.25)' },
  whileTap:   { scale: 0.985 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
};

export const buttonTap = { whileTap: { scale: 0.96 } };