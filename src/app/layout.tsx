// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-andresserginho.vercel.app"),
  title: "Andrés Serginho | Portafolio Metaverso & Full Stack Developer",
  description:
    "Explora el metaverso interactivo de Andrés Serginho. Tecnólogo ADSO SENA especializado en Turismo Santander, Saven-Sa, Supermercado Sena Tycoon y Meta Login.",
  keywords: [
    "Andres Serginho",
    "andresserginho",
    "Portafolio Metaverso",
    "Turismo Santander",
    "Saven-Sa",
    "Supermercado Sena Tycoon",
    "Meta Login",
    "Desarrollador Full Stack Bucaramanga",
    "ADSO SENA",
    "React Three Fiber 3D",
  ],
  authors: [{ name: "Andrés Serginho", url: "https://github.com/andresserginho" }],
  
  // ¡AQUÍ ESTÁ EL ARREGLO! Se usa "/favicon.png" y NO "/public/favicon.png"
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Andrés Serginho | Portafolio Metaverso 3D",
    description:
      "Plataforma interactiva e inmersiva que conecta mis proyectos Full Stack y entornos virtuales.",
    url: "https://portfolio-andresserginho.vercel.app",
    siteName: "Andrés Serginho Meta-Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Logo Arcade Neón Andrés Serginho",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-[#00ff66] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}