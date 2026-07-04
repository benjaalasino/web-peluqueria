import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionContainer({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-6 py-24 md:px-10', className)}>
      {children}
    </section>
  )
}
