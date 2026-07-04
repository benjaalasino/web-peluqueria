import { useMediaQuery } from '@/hooks/useMediaQuery'

export type QualityTier = 'low' | 'medium' | 'high'

export interface QualitySettings {
  tier: QualityTier
  strandCount: number
  dpr: [number, number]
  parallax: boolean
}

const TIERS: Record<QualityTier, QualitySettings> = {
  high: { tier: 'high', strandCount: 420, dpr: [1, 2], parallax: true },
  medium: { tier: 'medium', strandCount: 200, dpr: [1, 1.5], parallax: true },
  low: { tier: 'low', strandCount: 70, dpr: [1, 1], parallax: false },
}

export function useResponsiveQuality(): QualitySettings {
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')
  const isNarrow = useMediaQuery('(max-width: 767px)')
  const isMidRange = useMediaQuery('(max-width: 1279px)')

  if (isCoarsePointer || isNarrow) return TIERS.low
  if (isMidRange) return TIERS.medium
  return TIERS.high
}
