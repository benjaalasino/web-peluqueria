"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { ASSETS, TIME_SLOTS, type TimeSlot } from "@/lib/booking";

type ScheduleFrameProps = {
  active: boolean;
  onSelectTime: (time: TimeSlot) => void;
};

/**
 * FRAME 2 · A ras del círculo central: la cámara aterrizó sobre la cal
 * y el pasto. Sobre ese fondo se despliega el selector de horarios.
 */
const ScheduleFrame = forwardRef<HTMLDivElement, ScheduleFrameProps>(
  function ScheduleFrame({ active, onSelectTime }, ref) {
    return (
      <section
        ref={ref}
        aria-hidden={!active}
        className={`gpu-layer absolute inset-0 z-20 ${
          active ? "" : "pointer-events-none"
        }`}
      >
        {/* Fondo: primer plano del círculo central */}
        <div className="absolute inset-0">
          <Image
            src={ASSETS.fieldCenter}
            alt="Líneas de cal sobre el césped del círculo central"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_35%,rgba(3,14,6,0.72)_100%)]" />
        </div>

        {/* Selector de horarios */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <header className="text-center">
            <p className="time-card text-display text-xs sm:text-sm tracking-[0.5em] text-gold-400">
              Paso 2 de 3
            </p>
            <h2 className="time-card text-display mt-3 text-4xl sm:text-6xl font-bold text-chalk drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Elegí tu horario
            </h2>
            <p className="time-card mt-3 text-sm sm:text-base text-chalk-dim/80">
              Los turnos duran 60 minutos. Salí a la cancha.
            </p>
          </header>

          <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-4 sm:mt-14 sm:max-w-3xl sm:grid-cols-4 sm:gap-5">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className="time-card group relative overflow-hidden rounded-2xl border border-chalk/25 bg-grass-950/45 px-4 py-7 sm:py-9 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:bg-grass-900/60 hover:shadow-[0_16px_50px_-12px_rgba(251,191,36,0.35)] active:scale-95 cursor-pointer"
              >
                <span className="text-display block text-3xl sm:text-4xl font-bold text-chalk transition-colors group-hover:text-gold-300">
                  {time}
                </span>
                <span className="mt-2 block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-chalk/50 transition-colors group-hover:text-gold-400/80">
                  Disponible
                </span>
                {/* brillo dorado al pasar */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <p className="time-card mt-10 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-chalk/40">
            Elegí una hora y vamos directo al punto penal
          </p>
        </div>
      </section>
    );
  },
);

export default ScheduleFrame;
