import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useViewStore } from '@/store/viewStore'

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const startTransition = useViewStore((state) => state.startTransition)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-2xl tracking-wide text-bone">
          Barbería <span className="text-gold">Turnos</span>
        </a>
        <nav className="hidden gap-8 font-body text-sm tracking-wide text-bone-dim md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={startTransition}
          className="rounded-full border border-gold/50 px-5 py-2 font-body text-xs font-semibold tracking-wide text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
        >
          Reservar
        </button>
      </div>
    </motion.header>
  )
}
