# ⚽ La Cancha — Sistema de Turnos

Front-end cinematográfico para reservar turnos en una cancha de fútbol,
construido con **Next.js (App Router)**, **Tailwind CSS v4** y **GSAP**
(`@gsap/react`).

> ℹ️ Este repositorio se llamaba `web-peluqueria`; el proyecto actual es el
> sistema de turnos de la cancha. El nombre del repo en GitHub se cambia
> desde **Settings → General → Repository name** (requiere permisos de
> admin); el `package.json` ya se llama `cancha-futbol-turnos`.

## La experiencia

Un "viaje de cámara" a ras del pasto en tres frames:

1. **HERO — La cancha completa** (`public/images/field-full.jpg`)
   Vista aérea de la cancha con el botón **Reservar Turno** integrado sobre
   el círculo central. Al hacer clic, GSAP dispara un zoom continuo
   (`scale` 1 → 9 con `power4.in`) que "mete" la cámara en el pasto.

2. **SCHEDULE — Mitad de cancha** (`public/images/field-center.jpg`)
   Primer plano de las líneas de cal. Sobre el césped se despliega el
   selector de horarios (19:00 · 20:00 · 21:00 · 22:00). Elegir una hora
   lanza el segundo zoom veloz hacia el área penal.

3. **PENALTY — El penal** (`public/videos/penalty.mp4`)
   El video carga **pausado** en su primer frame (pelota en el punto penal).
   **Confirmar Reserva** despausa el video y se ejecuta la jugada; al
   terminar (`onEnded`), emerge el modal **"¡Reserva Confirmada con Éxito!"**
   que permite cerrar y volver al inicio.

Las transiciones usan solo `scale`, `opacity` (autoAlpha) y `yPercent`
sobre capas con `will-change: transform` para sostener 60fps en móvil y
desktop, más un overlay de "ráfagas" de tiza que vende la velocidad.

## Assets

| Archivo | Uso |
| --- | --- |
| `public/images/field-full.jpg` | Frame 1 — cancha completa (placeholder generado; reemplazable por la foto original) |
| `public/images/field-center.jpg` | Frame 2 — círculo central (placeholder generado; reemplazable por la foto original) |
| `public/videos/penalty.mp4` | Frame 3 — video del penal |

Para usar las fotos originales, basta con sobrescribir los dos `.jpg`
manteniendo el nombre de archivo.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx            # Metadata + viewport
│   ├── globals.css           # Paleta (césped/tiza/dorado) y utilidades
│   └── page.tsx
├── components/booking/
│   ├── BookingExperience.tsx # Orquestador: estados + timelines GSAP
│   ├── HeroFrame.tsx         # Frame 1 · cancha completa
│   ├── ScheduleFrame.tsx     # Frame 2 · selector de horarios
│   ├── PenaltyFrame.tsx      # Frame 3 · video del penal + confirmación
│   ├── SpeedStreaks.tsx      # Overlay de velocidad entre frames
│   └── SuccessModal.tsx      # Modal de reserva confirmada
└── lib/
    └── booking.ts            # Tipos, horarios y rutas de assets
```
