// src/data/portfolioData.ts

export interface MetaverseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  position: [number, number, number];
  color: string;
  badge: string;
  techs: string[];
}

export const USER_PROFILE = {
  username: "andresserginho",
  name: "Andrés Serginho",
  title: "Tecnólogo en Análisis y Desarrollo de Software (ADSO) - SENA",
  bio: "Arquitecto de software especializado en experiencias digitales inmersivas, metaversos 3D, desarrollo web full-stack de alto rendimiento y programación de entornos virtuales interactivos.",
  location: "Bucaramanga, Santander",
  email: "sergiovasquez0207@gmail.com",
  github: "https://github.com/andresserginho",
  instagram: "https://www.instagram.com/andrezinhoadso/",
  skills: [
    { name: "React / Next.js / TypeScript", level: 92, category: "frontend" },
    { name: "Three.js / WebGL / React Three Fiber", level: 85, category: "3d" },
    { name: "Tailwind CSS / UI / UX Design", level: 95, category: "frontend" },
    { name: "PHP / Laravel / C# / .NET", level: 84, category: "backend" },
    { name: "PostgreSQL / Base de Datos", level: 88, category: "database" },
    { name: "Unity 3D / Game Development", level: 80, category: "videogames" },
  ],
};

export const METAVERSE_PROJECTS: MetaverseProject[] = [
  {
    id: "turismo-santander",
    title: "Turismo Santander",
    description: "Plataforma interactiva galardonada de turismo regional accesible con cartografía avanzada y experiencias multisensoriales.",
    category: "Web & Accesibilidad 3D",
    url: "https://dev.turismo-santander.desarrollos-pablo-carvajal.com/",
    position: [-5.5, 0.8, -1],
    color: "#00ff66", // Verde Neón Cósmico
    badge: "SENA ADSO",
    techs: ["React", "TypeScript", "Tailwind", "Mapbox 3D"],
  },
  {
    id: "savensa",
    title: "Savensa",
    description: "Núcleo de desarrollo y gestión web institucional con paneles de control cuánticos y alta seguridad de datos.",
    category: "Gestión Institucional Full-Stack",
    url: "https://andresserginho.github.io/savensa/",
    position: [-1.8, -0.6, 1.2],
    color: "#00f0ff", // Cian Láser
    badge: "Full Stack",
    techs: ["PHP", "JavaScript", "PostgreSQL", "CSS3"],
  },
  {
    id: "supermercado-tycoon",
    title: "Supermarket Sena Tycoon",
    description: "Simulación de comercio empresarial en entorno virtual 3D con físicas en tiempo real y gestión comercial.",
    category: "Simulación 3D & Tycoon",
    url: "https://supermarket-sena-tycoon.vercel.app/",
    position: [1.8, 1.0, -0.5],
    color: "#f59e0b", // Oro Cuántico
    badge: "VR / Tycoon",
    techs: ["Unity", "Three.js", "C#", "WebGL"],
  },
  {
    id: "meta-login",
    title: "Meta Login",
    description: "Sistema de autenticación multi-universo ultraseguro con interfaz holográfica para plataformas descentralizadas.",
    category: "Autenticación Web3",
    url: "https://meta-login-sigma.vercel.app/",
    position: [5.5, -0.2, 1],
    color: "#a855f7", // Púrpura Hiperespacio
    badge: "Live Web3",
    techs: ["React", "Three.js", "Tailwind", "Vercel"],
  },
];