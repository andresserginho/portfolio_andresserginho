// src/data/portfolioData.ts
export interface MetaverseProject {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: string;
  techs: string[];
  url: string;
  color: string;
}

export interface EducationItem {
  period: string;
  location: string;
  title: string;
  institution: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  color: string;
}

export const USER_PROFILE = {
  name: "Andrés Serginho",
  title: "Tecnólogo en Análisis y Desarrollo de Software (ADSO) - SENA",
  bio: "Arquitecto de software y desarrollador Full Stack especializado en experiencias 3D inmersivas, interfaces WebGL interactivas y plataformas web modernas.",
  location: "Bucaramanga, Santander, Colombia",
  email: "andresserginho@gmail.com",
  github: "https://github.com/andresserginho",
  instagram: "https://instagram.com/andresserginho",
};

export const METAVERSE_PROJECTS: MetaverseProject[] = [
  {
    id: "aetherium",
    title: "Aetherium VR Labs",
    description: "Laboratorio virtual interactivo en entorno 3D para experiencias inmersivas y simulaciones de realidad virtual.",
    badge: "VR Labs",
    category: "Three.js / WebGL",
    techs: ["React Three Fiber", "JavaScript", "WebGL"],
    url: "https://andresserginho.github.io/AETHERIUM-VR-LABS/",
    color: "#00ff66",
  },
  {
    id: "turismo",
    title: "Turismo Santander",
    description: "Plataforma interactiva para la promoción turística de Santander con experiencias inmersivas y navegación digital accesible.",
    badge: "SENA ADSO",
    category: "Full Stack 3D",
    techs: ["React", "Next.js", "Tailwind", "Three.js"],
    url: "https://dev.turismo-santander.desarrollos-pablo-carvajal.com/",
    color: "#00f0ff",
  },
  {
    id: "savensa",
    title: "Savensa",
    description: "Sistema web avanzado de gestión institucional y optimización de procesos logísticos y empresariales.",
    badge: "Full Stack",
    category: "Backend & Frontend",
    techs: ["TypeScript", "Node.js", "Frontend"],
    url: "https://andresserginho.github.io/savensa/",
    color: "#ffb700",
  },
  {
    id: "supermercado",
    title: "Supermarket Sena Tycoon",
    description: "Simulación interactiva empresarial y gestión comercial estilo Tycoon en entorno virtual 3D.",
    badge: "VR / Tycoon",
    category: "GameDev / WebGL",
    techs: ["React Three Fiber", "JavaScript", "Animation"],
    url: "https://supermarket-sena-tycoon.vercel.app/",
    color: "#a855f7",
  },
  {
    id: "metalogin",
    title: "Login Metaversos",
    description: "Pasarela de autenticación inmersiva y futurista desarrollada para entornos virtuales del SENA.",
    badge: "Live Web3",
    category: "Seguridad & UI",
    techs: ["Next.js", "Tailwind", "Auth API"],
    url: "https://meta-login-sigma.vercel.app/",
    color: "#38bdf8",
  },
  {
    id: "portfolio",
    title: "Portafolio 3D Personal",
    description: "Metaverso personal interactivo con carrusel orbital 3D, hologramas y diseño ciberespacial.",
    badge: "Next.js 3D",
    category: "Portfolio",
    techs: ["Next.js", "Three.js", "Tailwind"],
    url: "https://portfolioandresserginho.vercel.app/",
    color: "#ec4899",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: "2023 - Presente",
    location: "Bucaramanga, Santander",
    title: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    institution: "SENA",
    description: "Formación integral en diseño de software, programación orientada a objetos, metodologías ágiles e integración de plataformas web modernas.",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  { id: "1", title: "Desarrollador de Habilidades Interpersonales", issuer: "SENA", date: "2024", color: "#00ff66" },
  { id: "2", title: "Prevención en Salud Mental", issuer: "SENA", date: "2025", color: "#00f0ff" },
  { id: "3", title: "Curso Especial en Excel Intermedio", issuer: "SENA", date: "2026", color: "#ffb700" },
  { id: "4", title: "AutoCAD 2D (Diseño Asistido)", issuer: "SENA", date: "2023", color: "#a855f7" },
  { id: "5", title: "HPGG02: A Complete Guide to Game Design", issuer: "HP", date: "2026", color: "#38bdf8" },
  { id: "6", title: "From Code to Creation: Mastering Game Programming", issuer: "En Curso (Finalización Próxima)", date: "2026", color: "#ec4899" },
];