import { motion } from 'motion/react'

export function Checkmark() {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className="h-20 w-20"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="var(--color-gold-500)"
        strokeWidth="3"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M20 33 L28 41 L45 23"
        fill="none"
        stroke="var(--color-gold-400)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}
