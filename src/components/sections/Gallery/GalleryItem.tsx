import { motion } from 'motion/react'
import type { GalleryItem as GalleryItemType } from '@/data/gallery'

export function GalleryItem({ item, index }: { item: GalleryItemType; index: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950 transition-transform duration-700 group-hover:scale-110"
        style={{ filter: `hue-rotate(${index * 8}deg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
      <p className="absolute bottom-4 left-4 font-display text-lg tracking-wide text-white">
        {item.label}
      </p>
    </motion.div>
  )
}
