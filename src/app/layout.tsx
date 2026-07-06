import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Cancha — Reservá tu turno",
  description:
    "Sistema cinematográfico de reserva de turnos para canchas de fútbol.",
};

export const viewport: Viewport = {
  themeColor: "#0b2e12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
