const OPEN_HOUR = 9
const CLOSE_HOUR = 19
const SLOT_MINUTES = 30
const BOOKINGS_KEY = 'peluqueria-bookings'

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function allSlotsForDay(): string[] {
  const slots: string[] = []
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
}

function readReservedSlots(barberId: string, dateISO: string): Set<string> {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    if (!raw) return new Set()
    const records: { barberId: string; date: string; time: string }[] = JSON.parse(raw)
    return new Set(
      records
        .filter((r) => r.barberId === barberId && r.date === dateISO)
        .map((r) => r.time),
    )
  } catch {
    return new Set()
  }
}

export function isDayClosed(dateISO: string): boolean {
  const day = new Date(`${dateISO}T00:00:00`).getDay()
  return day === 0 // domingo cerrado
}

export function getAvailableSlots(barberId: string, dateISO: string): string[] {
  if (!barberId || !dateISO || isDayClosed(dateISO)) return []

  const seed = hashString(`${barberId}-${dateISO}`)
  const reserved = readReservedSlots(barberId, dateISO)

  return allSlotsForDay().filter((slot, index) => {
    if (reserved.has(slot)) return false
    // determinístico "ya ocupado" mock: ~30% de los horarios no disponibles
    return (seed + index * 7) % 10 >= 3
  })
}
