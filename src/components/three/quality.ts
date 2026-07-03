export type QualityTier = 'low' | 'medium' | 'high'

export function detectQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 'medium'
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const lowConcurrency = (navigator.hardwareConcurrency ?? 4) <= 4
  const narrowViewport = window.innerWidth < 768

  if (coarsePointer && (lowConcurrency || narrowViewport)) return 'low'
  if (coarsePointer || narrowViewport) return 'medium'
  return 'high'
}

export const HAIR_STRAND_COUNT: Record<QualityTier, number> = {
  low: 220,
  medium: 450,
  high: 750,
}

export const DPR_CAP: Record<QualityTier, [number, number]> = {
  low: [1, 1],
  medium: [1, 1.5],
  high: [1, 2],
}
