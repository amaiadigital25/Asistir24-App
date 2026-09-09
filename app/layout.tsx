import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asistir24 Red | Gestión de asistencias",
  description: "Plataforma operativa para coordinar servicios y prestadores de Asistir24.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
