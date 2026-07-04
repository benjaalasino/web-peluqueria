import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useBookingStore } from '@/store/bookingStore'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre completo'),
  phone: z
    .string()
    .trim()
    .min(6, 'Ingresá un teléfono válido')
    .regex(/^[0-9+\s()-]+$/, 'Solo números y símbolos de teléfono'),
  email: z.string().trim().email('Ingresá un email válido').or(z.literal('')),
  notes: z.string().trim().max(280, 'Máximo 280 caracteres').optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export function StepContact() {
  const contact = useBookingStore((s) => s.contact)
  const setContact = useBookingStore((s) => s.setContact)
  const next = useBookingStore((s) => s.next)
  const submit = useBookingStore((s) => s.submit)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact,
  })

  function onSubmit(data: ContactForm) {
    setContact({ ...data, notes: data.notes ?? '' })
    submit()
    next()
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500 focus:outline-none'

  return (
    <div>
      <h3 className="font-display text-3xl tracking-wide text-white">Tus datos</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
        <div>
          <input className={inputClass} placeholder="Nombre y apellido" {...register('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <input className={inputClass} placeholder="Teléfono" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <input className={inputClass} placeholder="Email (opcional)" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <textarea
            className={cn(inputClass, 'min-h-24 resize-none')}
            placeholder="Notas (opcional)"
            {...register('notes')}
          />
          {errors.notes && <p className="mt-1 text-xs text-red-400">{errors.notes.message}</p>}
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gold-500 px-6 py-3 font-display text-lg tracking-wide text-ink-950 uppercase transition-colors hover:bg-gold-400"
        >
          Confirmar turno
        </button>
      </form>
    </div>
  )
}
