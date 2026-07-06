"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { TimeSlot } from "@/lib/booking";

type SuccessModalProps = {
  selectedTime: TimeSlot | null;
  onClose: () => void;
};

/**
 * Cartel flotante de éxito: emerge justo cuando termina la jugada del
 * penal (evento `onEnded` del video), con un pop elástico dorado.
 */
export default function SuccessModal({
  selectedTime,
  onClose,
}: SuccessModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
    )
      .fromTo(
        cardRef.current,
        { scale: 0.55, autoAlpha: 0, yPercent: 8 },
        {
          scale: 1,
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
        },
        0.1,
      )
      .fromTo(
        ".modal-item",
        { yPercent: 40, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.35,
      );
  });

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Reserva confirmada"
      className="absolute inset-0 z-50 flex items-center justify-center bg-grass-950/70 px-6 backdrop-blur-md"
    >
      <div
        ref={cardRef}
        className="gpu-layer relative w-full max-w-sm rounded-3xl border border-gold-400/40 bg-gradient-to-b from-grass-800/95 to-grass-950/95 px-8 py-10 text-center shadow-[0_30px_90px_-20px_rgba(251,191,36,0.4)]"
      >
        {/* Medalla dorada con tilde */}
        <div className="modal-item mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow-[0_10px_40px_-8px_rgba(251,191,36,0.7)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10 text-grass-950"
            aria-hidden
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="modal-item text-display mt-6 text-3xl sm:text-4xl font-bold text-chalk">
          ¡Reserva Confirmada con Éxito!
        </h3>

        <p className="modal-item mt-4 text-sm text-chalk-dim/85">
          Tu cancha te espera a las{" "}
          <span className="text-display text-lg font-bold text-gold-300">
            {selectedTime ?? "--:--"}
          </span>
          . ¡Golazo! Nos vemos adentro.
        </p>

        <div className="modal-item mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          className="modal-item mt-6 w-full rounded-full border border-chalk/25 bg-grass-900/70 px-8 py-4 text-display text-base font-bold text-chalk transition-all duration-300 hover:border-gold-400 hover:text-gold-300 active:scale-95 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
