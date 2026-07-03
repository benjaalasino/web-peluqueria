import { SectionContainer } from '@/components/layout/SectionContainer'
import { GalleryItem } from '@/components/sections/Gallery/GalleryItem'
import { gallery } from '@/data/gallery'

export function GallerySection() {
  return (
    <SectionContainer id="galeria" eyebrow="Galería" title="Trabajo terminado">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </SectionContainer>
  )
}
