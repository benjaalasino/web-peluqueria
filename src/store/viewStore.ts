import { create } from 'zustand'

export type View = 'landing' | 'transitioning' | 'booking'
export type TransitionPhase = 0 | 1 | 2 | 3

interface ViewState {
  view: View
  transitionPhase: TransitionPhase
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  startTransition: () => void
  setTransitionPhase: (phase: TransitionPhase) => void
  completeTransition: () => void
  returnToLanding: () => void
}

export const useViewStore = create<ViewState>((set, get) => ({
  view: 'landing',
  transitionPhase: 0,
  reducedMotion: false,
  setReducedMotion: (value) => set({ reducedMotion: value }),
  startTransition: () => {
    if (get().view !== 'landing') return
    if (get().reducedMotion) {
      set({ view: 'booking', transitionPhase: 3 })
      return
    }
    set({ view: 'transitioning', transitionPhase: 0 })
  },
  setTransitionPhase: (phase) => set({ transitionPhase: phase }),
  completeTransition: () => set({ view: 'booking', transitionPhase: 3 }),
  returnToLanding: () => set({ view: 'landing', transitionPhase: 0 }),
}))
