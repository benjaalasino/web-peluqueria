"use client";

import { forwardRef } from "react";
import { ASSETS } from "@/lib/booking";

/**
 * Overlay de "vuelo rasante": dos capas de pasto REAL con motion blur
 * (extraído del propio video del penal) que barren la pantalla a distintas
 * velocidades durante los zooms, como césped pasando pegado al lente.
 * GSAP solo anima yPercent/scale/opacity de cada capa → 60fps.
 */
const GrassRush = forwardRef<HTMLDivElement>(function GrassRush(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
    >
      {/* capa lejana: más lenta y tenue */}
      <div
        className="rush-far gpu-layer absolute -left-[10%] w-[120%] opacity-80"
        style={{
          top: "-100%",
          height: "300%",
          backgroundImage: `url(${ASSETS.grassRush})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* capa cercana: más rápida, más grande y más presente */}
      <div
        className="rush-near gpu-layer absolute -left-[25%] w-[150%]"
        style={{
          top: "-100%",
          height: "300%",
          backgroundImage: `url(${ASSETS.grassRush})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* sombra de túnel en los bordes para profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,16,7,0.55)_100%)]" />
    </div>
  );
});

export default GrassRush;
