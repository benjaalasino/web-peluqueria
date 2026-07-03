import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useBookingStore } from '@/store/bookingStore'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre completo'),
  phone: z.string().trim().min(6, 'Ingresá un teléfono válido'),
  email: z.union([z.literal(''), z.string().email('Email inválido')]).optional(),
  notes: z.string().optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export function StepContact() {
  const contact = useBookingStore((s) => s.contact)
  const setContact = useBookingStore((s) => s.setContact)
  const submit = useBookingStore((s) => s.submit)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact,
  })

  function onSubmit(values: ContactForm) {
    setContact(values)
    submit()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field label="Nombre completo" error={errors.name?.message}>
        <input {...register('name')} className={inputClass} placeholder="Juan Pérez" />
      </Field>
      <Field label="Teléfono" error={errors.phone?.message}>
        <input {...register('phone')} className={inputClass} placeholder="11 5555-5555" />
      </Field>
      <Field label="Email (opcional)" error={errors.email?.message}>
        <input {...register('email')} className={inputClass} placeholder="vos@email.com" />
      </Field>
      <Field label="Notas (opcional)">
        <textarea {...register('notes')} rows={3} className={inputClass} placeholder="Alguna preferencia para tu corte" />
      </Field>
      <Button type="submit" className="mt-2 w-full">
        Confirmar turno
      </Button>
    </form>
  )
}

const inputClass =
  'w-full rounded-lg border border-bone-dim/20 bg-ink-raised px-4 py-3 font-body text-bone placeholder:text-bone-dim/50 outline-none transition-colors focus:border-gold'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold tracking-wide text-bone-dim uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block font-body text-xs text-red-400">{error}</span>}
    </label>
  )
}
