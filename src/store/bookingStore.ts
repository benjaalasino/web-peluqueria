import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { saveBooking, type BookingRecord } from '@/data/availability'

export interface ContactInfo {
  name: string
  phone: string
  email?: string
  notes?: string
}

export const STEP_COUNT = 6

interface BookingState {
  step: number
  direction: 1 | -1
  serviceId?: string
  barberId?: string
  date?: string
  time?: string
  contact: ContactInfo
  lastConfirmed?: BookingRecord
  setService: (id: string) => void
  setBarber: (id: string) => void
  setDate: (iso: string) => void
  setTime: (time: string) => void
  setContact: (contact: ContactInfo) => void
  next: () => void
  back: () => void
  goTo: (step: number) => void
  reset: () => void
  submit: () => BookingRecord
}

const initialDraft = {
  step: 0,
  direction: 1 as const,
  serviceId: undefined,
  barberId: undefined,
  date: undefined,
  time: undefined,
  contact: { name: '', phone: '', email: '', notes: '' },
  lastConfirmed: undefined,
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialDraft,
      setService: (id) => set({ serviceId: id }),
      setBarber: (id) => set({ barberId: id, date: undefined, time: undefined }),
      setDate: (iso) => set({ date: iso, time: undefined }),
      setTime: (time) => set({ time }),
      setContact: (contact) => set({ contact }),
      next: () => set((s) => ({ step: Math.min(s.step + 1, STEP_COUNT - 1), direction: 1 })),
      back: () => set((s) => ({ step: Math.max(s.step - 1, 0), direction: -1 })),
      goTo: (step) =>
        set((s) => ({ step, direction: step >= s.step ? 1 : -1 })),
      reset: () => set({ ...initialDraft }),
      submit: () => {
        const s = get()
        const record: BookingRecord = {
          id: `bk_${Date.now()}`,
          serviceId: s.serviceId!,
          barberId: s.barberId!,
          date: s.date!,
          time: s.time!,
          contact: s.contact,
          createdAt: new Date().toISOString(),
        }
        saveBooking(record)
        set({ lastConfirmed: record, step: STEP_COUNT - 1, direction: 1 })
        return record
      },
    }),
    {
      name: 'peluqueria-booking-draft',
      partialize: (s) => ({
        step: s.step,
        serviceId: s.serviceId,
        barberId: s.barberId,
        date: s.date,
        time: s.time,
        contact: s.contact,
      }),
    },
  ),
)
