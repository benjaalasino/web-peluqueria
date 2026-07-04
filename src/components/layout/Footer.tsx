export function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/10 px-6 py-12 text-sm text-white/50 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl tracking-widest text-gold-300">NAVAJA</p>
          <p className="mt-2 max-w-sm">
            Av. Corrientes 1234, Buenos Aires · Mar a Sáb 9:00–19:00
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <a href="tel:+541122223333" className="transition-colors hover:text-gold-300">
            +54 11 2222-3333
          </a>
          <a href="mailto:hola@navaja.com" className="transition-colors hover:text-gold-300">
            hola@navaja.com
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-white/30">
        © {new Date().getFullYear()} Navaja Barbería. Todos los derechos reservados.
      </p>
    </footer>
  )
}
