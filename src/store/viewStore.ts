import { create } from 'zustand'
import { prefersReducedMotion } from '@/lib/reducedMotion'

export type View = 'landing' | 'transitioning' | 'booking'

interface ViewState {
  view: View
  startTransition: () => void
  completeTransition: () => void
  returnToLanding: () => void
}

export const useViewStore = create<ViewState>((set, get) => ({
  view: 'landing',
  startTransition: () => {
    if (get().view !== 'landing') return
    if (prefersReducedMotion()) {
      set({ view: 'booking' })
      return
    }
    set({ view: 'transitioning' })
  },
  completeTransition: () => {
    if (get().view === 'transitioning') set({ view: 'booking' })
  },
  returnToLanding: () => set({ view: 'landing' }),
}))
