"use client";

import { forwardRef } from "react";
import { ASSETS } from "@/lib/booking";

/**
 * Overlay de "cámara pegada al piso": dos capas de pasto REAL con motion
 * blur (extraído del propio video del penal) que se deslizan por la
 * pantalla como el césped pasando bajo una cámara que viaja a ras de
 * suelo de un punto a otro — no un túnel que se atraviesa, sino el piso
 * corriendo por debajo del lente. Las capas se mueven a distinta
 * velocidad vertical Y horizontal (motion parallax) para vender que la
 * cámara se desplaza hacia adelante y hacia un costado, no hacia adentro.
 * GSAP solo anima x/yPercent/scale/opacity de cada capa → 60fps.
 */
const GrassRush = forwardRef<HTMLDivElement>(function GrassRush(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
    >
      {/* capa lejana: más lenta y tenue, deriva sutil */}
      <div
        className="rush-far gpu-layer absolute -left-[15%] w-[130%] opacity-70"
        style={{
          top: "-60%",
          height: "220%",
          backgroundImage: `url(${ASSETS.grassRush})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* capa cercana: mucho más rápida y grande, como pasto pegado al lente */}
      <div
        className="rush-near gpu-layer absolute -left-[35%] w-[170%]"
        style={{
          top: "-60%",
          height: "220%",
          backgroundImage: `url(${ASSETS.grassRush})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* motion blur direccional: oscurece arriba/abajo, deja el centro
          (línea de la mirada) limpio, en vez de un túnel radial */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,16,7,0.5)_0%,transparent_30%,transparent_70%,rgba(4,16,7,0.5)_100%)]" />
    </div>
  );
});

export default GrassRush;
