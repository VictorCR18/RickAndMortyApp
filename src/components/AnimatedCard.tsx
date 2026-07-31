import { motion, useReducedMotion } from 'framer-motion'
import type { AnimatedCardProps } from '../types'

export function AnimatedCard({ children, title }: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -4, boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)' }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97, y: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="character-card"
    >
      {title && <h3>{title}</h3>}
      {children}
    </motion.article>
  )
}
