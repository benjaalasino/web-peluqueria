"use client";

import { forwardRef } from "react";

/** Posiciones y tamaños fijos (no aleatorios) para evitar
 *  diferencias de hidratación entre servidor y cliente. */
const STREAKS = [
  { left: "8%", width: 2, height: "42vh", opacity: 0.5 },
  { left: "18%", width: 3, height: "60vh", opacity: 0.7 },
  { left: "29%", width: 2, height: "38vh", opacity: 0.45 },
  { left: "38%", width: 4, height: "72vh", opacity: 0.8 },
  { left: "47%", width: 2, height: "50vh", opacity: 0.55 },
  { left: "56%", width: 3, height: "66vh", opacity: 0.75 },
  { left: "66%", width: 2, height: "44vh", opacity: 0.5 },
  { left: "76%", width: 4, height: "70vh", opacity: 0.8 },
  { left: "86%", width: 2, height: "40vh", opacity: 0.45 },
  { left: "94%", width: 3, height: "58vh", opacity: 0.65 },
] as const;

/**
 * Overlay de "ráfaga": líneas verticales de tiza y verde que barren la
 * pantalla durante los zooms, vendiendo la velocidad de la cámara a ras
 * del pasto. GSAP solo anima yPercent/opacity de cada `.streak`.
 */
const SpeedStreaks = forwardRef<HTMLDivElement>(function SpeedStreaks(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
    >
      {/* flash verde central, como pasto pasando pegado al lente */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,107,56,0.35)_0%,transparent_65%)]" />
      {STREAKS.map((s, i) => (
        <span
          key={i}
          className="streak gpu-layer absolute top-0 rounded-full bg-gradient-to-b from-transparent via-chalk to-transparent blur-[1px]"
          style={{
            left: s.left,
            width: s.width,
            height: s.height,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
});

export default SpeedStreaks;
