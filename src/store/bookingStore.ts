import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ContactInfo {
  name: string
  phone: string
  email: string
  notes: string
}

export interface BookingRecord {
  serviceId: string
  barberId: string
  date: string
  time: string
  contact: ContactInfo
  createdAt: string
}

const STEP_COUNT = 6
const BOOKINGS_KEY = 'peluqueria-bookings'

interface BookingState {
  step: number
  direction: 1 | -1
  serviceId?: string
  barberId?: string
  date?: string
  time?: string
  contact: ContactInfo
  confirmedRecord?: BookingRecord
  next: () => void
  back: () => void
  goTo: (step: number) => void
  setService: (serviceId: string) => void
  setBarber: (barberId: string) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setContact: (contact: Partial<ContactInfo>) => void
  submit: () => BookingRecord
  reset: () => void
}

const emptyContact: ContactInfo = { name: '', phone: '', email: '', notes: '' }

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      step: 0,
      direction: 1,
      contact: emptyContact,

      next: () => set((s) => ({ step: Math.min(s.step + 1, STEP_COUNT - 1), direction: 1 })),
      back: () => set((s) => ({ step: Math.max(s.step - 1, 0), direction: -1 })),
      goTo: (step) =>
        set((s) => ({ step, direction: step >= s.step ? 1 : -1 })),

      setService: (serviceId) => set({ serviceId }),
      setBarber: (barberId) => set({ barberId }),
      setDate: (date) => set({ date, time: undefined }),
      setTime: (time) => set({ time }),
      setContact: (contact) => set((s) => ({ contact: { ...s.contact, ...contact } })),

      submit: () => {
        const s = get()
        const record: BookingRecord = {
          serviceId: s.serviceId!,
          barberId: s.barberId!,
          date: s.date!,
          time: s.time!,
          contact: s.contact,
          createdAt: new Date().toISOString(),
        }
        try {
          const raw = localStorage.getItem(BOOKINGS_KEY)
          const existing: BookingRecord[] = raw ? JSON.parse(raw) : []
          localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...existing, record]))
        } catch {
          // localStorage no disponible: la reserva sigue confirmándose en memoria
        }
        set({ confirmedRecord: record })
        return record
      },

      reset: () =>
        set({
          step: 0,
          direction: 1,
          serviceId: undefined,
          barberId: undefined,
          date: undefined,
          time: undefined,
          contact: emptyContact,
          confirmedRecord: undefined,
        }),
    }),
    { name: 'peluqueria-booking-draft' },
  ),
)
