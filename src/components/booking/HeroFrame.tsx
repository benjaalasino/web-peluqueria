"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/booking";

type HeroFrameProps = {
  active: boolean;
  onReserve: () => void;
};

/**
 * FRAME 1 · La cancha completa vista desde arriba.
 * Vertical nativa para celulares; en desktop la imagen cubre recortando
 * los laterales sin deformarse.
 */
const HeroFrame = forwardRef<HTMLDivElement, HeroFrameProps>(
  function HeroFrame({ active, onReserve }, ref) {
    return (
      <section
        ref={ref}
        aria-hidden={!active}
        className={`gpu-layer absolute inset-0 z-30 ${
          active ? "" : "pointer-events-none"
        }`}
      >
        {/* Fondo: cancha completa */}
        <div className="hero-bg gpu-layer absolute inset-0">
          <Image
            src={ASSETS.fieldFull}
            alt="Cancha de fútbol vista desde arriba"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Luz de estadio: viñeta + brillo superior */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_45%,rgba(4,18,8,0.55)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-grass-950/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-grass-950/80 to-transparent" />
        </div>

        {/* UI del hero */}
        <div className="hero-ui absolute inset-0 flex flex-col items-center justify-between px-6 py-10 sm:py-14">
          <header className="text-center">
            <p className="text-display text-xs sm:text-sm text-gold-400 tracking-[0.5em]">
              Fútbol 5 · Césped profesional
            </p>
            <h1 className="text-display mt-3 text-5xl sm:text-7xl font-bold text-chalk drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              La Cancha
            </h1>
            <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-chalk/70 to-transparent" />
          </header>

          {/* Botón integrado sobre el círculo central */}
          <div className="flex flex-1 items-center justify-center">
            <button
              type="button"
              onClick={onReserve}
              className="group relative rounded-full border-2 border-chalk/80 bg-grass-900/40 px-10 py-5 sm:px-14 sm:py-6 backdrop-blur-sm animate-pulse-glow transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-display text-xl sm:text-2xl font-bold text-chalk">
                Reservar Turno
              </span>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-chalk/60 whitespace-nowrap transition-colors group-hover:text-gold-300">
                Tocá para entrar a la cancha
              </span>
            </button>
          </div>

          <footer className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-chalk/50">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Turnos disponibles todos los días
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </footer>
        </div>
      </section>
    );
  },
);

export default HeroFrame;
