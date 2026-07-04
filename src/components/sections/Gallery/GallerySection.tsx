import { SectionContainer } from '@/components/layout/SectionContainer'
import { Reveal, RevealGroup, revealItemVariants } from '@/components/ui/Reveal'
import { gallery } from '@/data/gallery'
import { GalleryItem } from './GalleryItem'
import { motion } from 'motion/react'

export function GallerySection() {
  return (
    <SectionContainer id="galeria">
      <Reveal>
        <p className="text-sm tracking-[0.3em] text-gold-400 uppercase">Galería</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white md:text-5xl">
          Trabajos recientes
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((item, index) => (
          <motion.div key={item.id} variants={revealItemVariants}>
            <GalleryItem item={item} index={index} />
          </motion.div>
        ))}
      </RevealGroup>
    </SectionContainer>
  )
}
