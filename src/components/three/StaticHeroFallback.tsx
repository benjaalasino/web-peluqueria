export function StaticHeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(45% 40% at 65% 45%, rgba(201,162,39,0.22), transparent 70%), radial-gradient(60% 50% at 30% 55%, rgba(20,15,10,0.9), transparent 70%)',
      }}
    />
  )
}
