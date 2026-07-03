import { motion } from 'motion/react'
import type { GalleryItem as GalleryItemType } from '@/data/gallery'
import { fadeInUp } from '@/lib/motionVariants'

export function GalleryItem({ item, index }: { item: GalleryItemType; index: number }) {
  const hue = 42 + ((index * 17) % 30)
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-bone-dim/10"
      style={{
        background: `linear-gradient(160deg, hsl(${hue} 35% 10%), hsl(${hue} 60% 6%) 60%, #060606)`,
      }}
    >
      <div className="absolute inset-0 flex items-end p-5">
        <p className="font-display text-lg tracking-wide text-bone/90">{item.caption}</p>
      </div>
      <div className="absolute inset-0 bg-gold/0 transition-colors duration-300 group-hover:bg-gold/5" />
    </motion.div>
  )
}
