export function Footer() {
  return (
    <footer className="border-t border-bone-dim/10 bg-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center font-body text-sm text-bone-dim md:flex-row md:justify-between md:text-left">
        <p className="font-display text-xl tracking-wide text-bone">
          Barbería <span className="text-gold">Turnos</span>
        </p>
        <p>Av. Siempre Viva 742 · Mar/Sáb 9:00–19:00 · +54 9 11 5555-5555</p>
        <p>© {new Date().getFullYear()} Barbería Turnos. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
