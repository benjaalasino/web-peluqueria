"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import HeroFrame from "./HeroFrame";
import ScheduleFrame from "./ScheduleFrame";
import PenaltyFrame from "./PenaltyFrame";
import GrassRush from "./GrassRush";
import SuccessModal from "./SuccessModal";
import type { Frame, TimeSlot } from "@/lib/booking";

gsap.registerPlugin(useGSAP);

/**
 * Orquesta el "viaje de cámara" entre los tres frames:
 *   HERO (cancha completa) → SCHEDULE (círculo central) → PENALTY (video).
 *
 * Los tres frames viven apilados en un contenedor fixed; GSAP anima
 * únicamente `scale`, `opacity` (autoAlpha) y `yPercent` para mantener
 * las transiciones compuestas en GPU a 60fps.
 */
export default function BookingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const penaltyRef = useRef<HTMLDivElement>(null);
  const streaksRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [frame, setFrame] = useState<Frame>("HERO");
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const isTransitioning = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      // Estado inicial: solo el HERO visible.
      gsap.set([scheduleRef.current, penaltyRef.current], { autoAlpha: 0 });
      gsap.set(streaksRef.current, { autoAlpha: 0 });

      // Respiración sutil del fondo del hero para que la toma se sienta viva.
      gsap.to(".hero-bg", {
        scale: 1.07,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  /** Ráfaga de "piso corriendo": pasto REAL con motion blur (cosechado del
   *  video del penal) se desliza en dos capas con parallax mientras la
   *  cámara viaja a ras de suelo de un punto a otro (no un túnel que se
   *  atraviesa: el césped pasa por debajo/al costado del lente). */
  const addStreaks = (
    tl: gsap.core.Timeline,
    at: number,
    dir: 1 | -1 = 1,
  ) => {
    tl.fromTo(
      streaksRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.18, ease: "power1.in" },
      at,
    )
      .fromTo(
        ".rush-far",
        { yPercent: -18 * dir, xPercent: -6 * dir },
        { yPercent: 18 * dir, xPercent: 6 * dir, duration: 0.95, ease: "none" },
        at,
      )
      .fromTo(
        ".rush-near",
        { yPercent: -34 * dir, xPercent: -14 * dir },
        { yPercent: 34 * dir, xPercent: 14 * dir, duration: 0.95, ease: "none" },
        at,
      )
      .to(streaksRef.current, { autoAlpha: 0, duration: 0.32 }, at + 0.66);
  };

  /** FRAME 1 → FRAME 2: la cámara desciende a ras de piso y viaja de
   *  frente hacia el círculo central — un traveling, no un zoom que
   *  perfora la imagen. La cancha completa queda "atrás" (se desliza y
   *  se achica levemente hacia arriba) mientras la mitad de cancha entra
   *  deslizándose desde abajo y se asienta. */
  const goToSchedule = contextSafe(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        isTransitioning.current = false;
        setFrame("SCHEDULE");
      },
    });

    tl.set(scheduleRef.current, {
      autoAlpha: 1,
      scale: 1.5,
      yPercent: 30,
      xPercent: -6,
      transformOrigin: "50% 55%",
    })
      // La cancha completa avanza y queda atrás: se desliza hacia arriba
      // (como si la cámara la sobrepasara) con un acercamiento suave.
      .to(
        heroRef.current,
        {
          scale: 1.5,
          yPercent: -48,
          xPercent: 8,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power3.in",
          transformOrigin: "50% 55%",
        },
        0,
      )
      .to(
        ".hero-ui",
        { autoAlpha: 0, yPercent: -14, duration: 0.32, ease: "power2.in" },
        0,
      );

    addStreaks(tl, 0.4, 1);

    // La mitad de cancha llega y se asienta: la cámara frena de golpe.
    tl.to(
      scheduleRef.current,
      {
        scale: 1,
        yPercent: 0,
        xPercent: 0,
        duration: 0.85,
        ease: "power3.out",
      },
      0.68,
    ).fromTo(
      ".time-card",
      { yPercent: 26, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "back.out(1.6)",
      },
      1.15,
    );
  });

  /** FRAME 2 → FRAME 3: elegido el horario, la cámara sigue de largo a
   *  ras de piso rumbo al área penal (mismo lenguaje de traveling). */
  const handleSelectTime = contextSafe((time: TimeSlot) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setSelectedTime(time);

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        isTransitioning.current = false;
        setFrame("PENALTY");
      },
    });

    tl.set(penaltyRef.current, {
      autoAlpha: 1,
      scale: 1.45,
      yPercent: 26,
      xPercent: 7,
      transformOrigin: "50% 60%",
    }).to(
      scheduleRef.current,
      {
        scale: 1.45,
        yPercent: -50,
        xPercent: -9,
        autoAlpha: 0,
        duration: 0.95,
        ease: "power3.in",
        transformOrigin: "50% 60%",
      },
      0,
    );

    addStreaks(tl, 0.38, -1);

    tl.to(
      penaltyRef.current,
      {
        scale: 1,
        yPercent: 0,
        xPercent: 0,
        duration: 0.85,
        ease: "power3.out",
      },
      0.66,
    ).fromTo(
      ".confirm-ui",
      { yPercent: 30, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(1.4)" },
      1.2,
    );
  });

  /** Confirmar reserva: se despausa el video y se ejecuta el penal. */
  const handleConfirm = contextSafe(() => {
    const video = videoRef.current;
    if (!video || isPlaying) return;

    gsap.to(".confirm-ui", {
      autoAlpha: 0,
      yPercent: 20,
      duration: 0.4,
      ease: "power2.in",
    });

    setIsPlaying(true);
    video.play().catch(() => {
      // Si el navegador bloquea la reproducción, restauramos la UI.
      setIsPlaying(false);
      gsap.to(".confirm-ui", {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  /** El video terminó: el gol ya está abajo a la izquierda → modal de éxito. */
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsConfirmed(true);
  };

  /** Cerrar el modal reinicia el viaje completo hacia el frame inicial. */
  const handleReset = contextSafe(() => {
    setIsConfirmed(false);
    setIsPlaying(false);
    setSelectedTime(null);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    const tl = gsap.timeline({
      onComplete: () => setFrame("HERO"),
    });

    tl.to([penaltyRef.current, scheduleRef.current], {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
      .set(scheduleRef.current, { scale: 1.5, yPercent: 30, xPercent: -6 })
      .set(penaltyRef.current, { scale: 1.45, yPercent: 26, xPercent: 7 })
      .set(".confirm-ui", { autoAlpha: 0 })
      .fromTo(
        heroRef.current,
        { scale: 1.2, yPercent: -20, xPercent: 6, autoAlpha: 0 },
        {
          scale: 1,
          yPercent: 0,
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        0.3,
      )
      .fromTo(
        ".hero-ui",
        { autoAlpha: 0, yPercent: 10 },
        { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power2.out" },
        0.8,
      );
  });

  return (
    <div ref={root} className="fixed inset-0 overflow-hidden bg-grass-950">
      {/* FRAME 3 · El penal (queda debajo, se revela con el zoom) */}
      <PenaltyFrame
        ref={penaltyRef}
        videoRef={videoRef}
        active={frame === "PENALTY"}
        isPlaying={isPlaying}
        selectedTime={selectedTime}
        onConfirm={handleConfirm}
        onVideoEnded={handleVideoEnded}
      />

      {/* FRAME 2 · Mitad de cancha (selector de horarios) */}
      <ScheduleFrame
        ref={scheduleRef}
        active={frame === "SCHEDULE"}
        onSelectTime={handleSelectTime}
      />

      {/* FRAME 1 · Cancha completa (hero) */}
      <HeroFrame
        ref={heroRef}
        active={frame === "HERO"}
        onReserve={goToSchedule}
      />

      {/* Overlay de velocidad para las transiciones */}
      <GrassRush ref={streaksRef} />

      {/* Modal de éxito */}
      {isConfirmed && (
        <SuccessModal selectedTime={selectedTime} onClose={handleReset} />
      )}
    </div>
  );
}
