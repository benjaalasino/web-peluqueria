"use client";

import { forwardRef, type RefObject } from "react";
import { ASSETS, type TimeSlot } from "@/lib/booking";

type PenaltyFrameProps = {
  active: boolean;
  isPlaying: boolean;
  selectedTime: TimeSlot | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  onConfirm: () => void;
  onVideoEnded: () => void;
};

/**
 * FRAME 3 · El punto penal. El video carga PAUSADO en su primer frame
 * (pelota en el punto, arquero esperando). "Confirmar Reserva" despausa
 * el video; cuando la jugada termina (gol), `onEnded` dispara el modal.
 */
const PenaltyFrame = forwardRef<HTMLDivElement, PenaltyFrameProps>(
  function PenaltyFrame(
    { active, isPlaying, selectedTime, videoRef, onConfirm, onVideoEnded },
    ref,
  ) {
    return (
      <section
        ref={ref}
        aria-hidden={!active}
        className={`gpu-layer absolute inset-0 z-10 ${
          active ? "" : "pointer-events-none"
        }`}
      >
        {/* Video del penal: pausado hasta confirmar */}
        <video
          ref={videoRef}
          src={ASSETS.penaltyVideo}
          preload="auto"
          playsInline
          muted
          onEnded={onVideoEnded}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Grado cinematográfico sobre el video */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isPlaying ? "opacity-40" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_40%,rgba(3,12,6,0.6)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-grass-950/85 to-transparent" />
        </div>

        {/* UI de confirmación superpuesta al video pausado */}
        <div className="confirm-ui absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-10 sm:pb-16">
          <div className="flex items-center gap-3 rounded-full border border-chalk/20 bg-grass-950/60 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-display text-xs sm:text-sm tracking-[0.35em] text-chalk/80">
              Turno seleccionado
            </span>
            <span className="text-display text-lg sm:text-xl font-bold text-gold-300">
              {selectedTime ?? "--:--"}
            </span>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPlaying}
            className="group relative rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-12 py-5 sm:px-16 sm:py-6 shadow-[0_18px_60px_-12px_rgba(251,191,36,0.55)] transition-transform duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none cursor-pointer"
          >
            <span className="text-display text-xl sm:text-2xl font-bold text-grass-950">
              Confirmar Reserva
            </span>
          </button>

          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-chalk/50">
            Confirmá y pateá el penal
          </p>
        </div>
      </section>
    );
  },
);

export default PenaltyFrame;
