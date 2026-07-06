export type Frame = "HERO" | "SCHEDULE" | "PENALTY";

export const TIME_SLOTS = ["19:00", "20:00", "21:00", "22:00"] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const ASSETS = {
  fieldFull: "/images/field-full.jpg",
  fieldCenter: "/images/field-center.jpg",
  grassRush: "/images/grass-rush.jpg",
  penaltyVideo: "/videos/penalty.mp4",
} as const;
