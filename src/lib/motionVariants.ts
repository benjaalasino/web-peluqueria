import type { Variants } from 'motion/react'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const stepVariants: Variants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, x: direction * 32 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * -32,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
}
