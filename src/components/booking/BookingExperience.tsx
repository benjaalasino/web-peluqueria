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

  /** Ráfaga de velocidad: pasto REAL con motion blur (cosechado del video
   *  del penal) barre la pantalla en dos capas parallax mientras la cámara
   *  "corre" a ras del césped. */
  const addStreaks = (tl: gsap.core.Timeline, at: number) => {
    tl.fromTo(
      streaksRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.16, ease: "power1.in" },
      at,
    )
      .fromTo(
        ".rush-far",
        { yPercent: -26, scale: 1 },
        { yPercent: 24, scale: 1.08, duration: 0.85, ease: "none" },
        at,
      )
      .fromTo(
        ".rush-near",
        { yPercent: -42, scale: 1.15 },
        { yPercent: 38, scale: 1.3, duration: 0.85, ease: "none" },
        at,
      )
      .to(streaksRef.current, { autoAlpha: 0, duration: 0.3 }, at + 0.58);
  };

  /** FRAME 1 → FRAME 2: zoom continuo hacia el centro de la cancha. */
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

    // La mitad de cancha arranca "muy cerca" y se asienta: la cámara aterriza.
    tl.set(scheduleRef.current, {
      autoAlpha: 1,
      scale: 2.6,
      transformOrigin: "50% 45%",
    })
      // La cancha completa se traga a la cámara: zoom violento al círculo central.
      .to(
        heroRef.current,
        {
          scale: 9,
          autoAlpha: 0,
          duration: 1.15,
          ease: "power4.in",
          transformOrigin: "50% 42%",
        },
        0,
      )
      .to(
        ".hero-ui",
        { autoAlpha: 0, yPercent: -12, duration: 0.35, ease: "power2.in" },
        0,
      );

    addStreaks(tl, 0.55);

    tl.to(
      scheduleRef.current,
      { scale: 1, duration: 1.05, ease: "power3.out" },
      0.85,
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
      1.3,
    );
  });

  /** FRAME 2 → FRAME 3: elegido el horario, la cámara vuela al área penal. */
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
      transformOrigin: "50% 60%",
    })
      // Deriva hacia abajo + zoom: corremos por el pasto rumbo al punto penal.
      .to(
        scheduleRef.current,
        {
          scale: 7,
          yPercent: -18,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power4.in",
          transformOrigin: "50% 82%",
        },
        0,
      );

    addStreaks(tl, 0.5);

    tl.to(
      penaltyRef.current,
      { scale: 1, duration: 1.0, ease: "power3.out" },
      0.8,
    ).fromTo(
      ".confirm-ui",
      { yPercent: 30, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(1.4)" },
      1.35,
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
      .set(scheduleRef.current, { scale: 2.6, yPercent: 0 })
      .set(penaltyRef.current, { scale: 1.45 })
      .set(".confirm-ui", { autoAlpha: 0 })
      .fromTo(
        heroRef.current,
        { scale: 1.25, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
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
