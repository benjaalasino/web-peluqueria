const START_HOUR = 9
const END_HOUR = 19
const SLOT_MINUTES = 30
const BOOKINGS_KEY = 'peluqueria-bookings'

export interface BookingRecord {
  id: string
  serviceId: string
  barberId: string
  date: string
  time: string
  contact: { name: string; phone: string; email?: string; notes?: string }
  createdAt: string
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

function minutesToLabel(minutes: number): string {
  const hh = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')
  const mm = (minutes % 60).toString().padStart(2, '0')
  return `${hh}:${mm}`
}

function readBookings(): BookingRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(BOOKINGS_KEY)
    return raw ? (JSON.parse(raw) as BookingRecord[]) : []
  } catch {
    return []
  }
}

export function saveBooking(record: BookingRecord) {
  const bookings = readBookings()
  bookings.push(record)
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

function getBookedSlots(barberId: string, dateISO: string): Set<string> {
  const bookings = readBookings()
  return new Set(
    bookings.filter((b) => b.barberId === barberId && b.date === dateISO).map((b) => b.time),
  )
}

export function isSalonClosed(dateISO: string): boolean {
  const date = new Date(`${dateISO}T00:00:00`)
  return date.getDay() === 0
}

export function getAvailableSlots(barberId: string, dateISO: string): string[] {
  if (isSalonClosed(dateISO)) return []

  const seed = hashString(`${barberId}-${dateISO}`)
  const booked = getBookedSlots(barberId, dateISO)
  const slots: string[] = []
  let index = 0

  for (let minutes = START_HOUR * 60; minutes < END_HOUR * 60; minutes += SLOT_MINUTES) {
    const label = minutesToLabel(minutes)
    const deterministicallyTaken = (seed + index * 13) % 5 === 0
    if (!deterministicallyTaken && !booked.has(label)) {
      slots.push(label)
    }
    index += 1
  }

  return slots
}
