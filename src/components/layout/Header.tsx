import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="#top" className="font-display text-2xl tracking-widest text-gold-300">
        NAVAJA
      </a>
      <nav className="hidden gap-8 text-sm tracking-wide text-white/70 md:flex">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-gold-300">
            {link.label}
          </a>
        ))}
      </nav>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-6 mt-2 flex flex-col gap-1 rounded-xl border border-white/10 bg-ink-800 p-3 md:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
