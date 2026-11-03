// src/app/page.tsx
'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  USER_PROFILE, 
  EDUCATION_DATA, 
  CERTIFICATIONS_DATA, 
  MetaverseProject 
} from "@/data/portfolioData";

const MetaverseScene = dynamic(() => import("@/components/3d/MetaverseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[75vh] md:h-[85vh] flex flex-col items-center justify-center bg-[#01030d] rounded-3xl border border-cyan-500/30 shadow-2xl">
      <div className="w-16 h-16 border-4 border-[#00ff66] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#00ff66] font-mono text-sm tracking-widest animate-pulse">
        INICIALIZANDO ENTORNO 3D NEXT-GEN...
      </p>
    </div>
  ),
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<MetaverseProject | null>(null);
  const [educationTab, setEducationTab] = useState<"education" | "certifications">("education");
  const [time, setTime] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-CO", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const playSound = (freq = 520, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignorar restricciones de audio
    }
  };

  return (
    <main className="min-h-screen bg-[#01030d] text-slate-100 selection:bg-[#00ff66] selection:text-black overflow-x-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,102,0.12),rgba(0,240,255,0.05),transparent_70%)]" />

      {/* BARRA SUPERIOR HUD */}
      <nav className="sticky top-0 z-40 bg-[#01030d]/85 backdrop-blur-2xl border-b border-[#00ff66]/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Logo Andrés Serginho" 
              width={36}
              height={36}
              priority
              loading="eager"
              className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(0,255,102,0.9)]"
            />
            <span className="text-[#00ff66] font-bold tracking-widest">{"[ ANDRESSERGINHO // ONLINE ]"}</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-400">
            <span>COL_TIME: <strong className="text-[#00ff66]">{time || "12:00:00"}</strong></span>
            <span>RENDER: <strong className="text-cyan-400">WEBGL 3D INTERACTIVE</strong></span>
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound(700)}
              className="text-[#00ff66] hover:underline font-bold"
            >
              GITHUB REPO ↗
            </a>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound(900, "triangle");
            }}
            className="px-3.5 py-1.5 bg-slate-900 border border-[#00ff66]/40 rounded-xl text-[#00ff66] hover:border-[#00ff66] transition-all shadow-[0_0_15px_rgba(0,255,102,0.2)]"
          >
            {soundEnabled ? "🔊 AUDIO: ON" : "🔇 AUDIO: OFF"}
          </button>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 py-14 space-y-24">

        {/* HEADER / PERFIL */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-6 border-b border-slate-800/80 pb-14 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] text-xs font-mono px-4 py-2 rounded-full shadow-[0_0_25px_rgba(0,255,102,0.3)]">
            {"SYSTEM_ACCESS_GRANTED // SENA ADSO & FULLSTACK 3D"}
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#00ff66] bg-clip-text text-transparent">
            {USER_PROFILE.name}
          </h1>

          <p className="text-xl md:text-2xl text-[#00f0ff] font-bold tracking-wide">
            {USER_PROFILE.title}
          </p>

          <p className="text-slate-300 max-w-3xl leading-relaxed text-base md:text-lg">
            {USER_PROFILE.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start text-xs font-mono text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl">📍 {USER_PROFILE.location}</span>
            <a
              href={`mailto:${USER_PROFILE.email}`}
              onClick={() => playSound(600)}
              className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl hover:border-[#00ff66] transition-colors"
            >
              ✉️ {USER_PROFILE.email}
            </a>
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound(650)}
              className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl hover:border-[#00ff66] transition-colors text-[#00ff66] font-bold"
            >
              💻 GitHub: andresserginho ↗
            </a>
          </div>
        </motion.header>

        {/* SECCIÓN 3D: CARRUSEL EN ÓRBITA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="text-2xl md:text-4xl font-black flex items-center gap-3 text-white">
              <span className="text-[#00ff66] font-mono">&gt;</span> Proyectos en Órbita 3D
            </h2>
            <span className="text-xs font-mono text-cyan-300 border border-cyan-900 bg-cyan-950/50 px-4 py-1.5 rounded-full">
              Arrastra con el mouse para rotar el carrusel • Haz clic en una tarjeta para ver detalles
            </span>
          </div>

          <MetaverseScene
            isModalOpen={!!selectedProject}
            onSelectProject={(proj: MetaverseProject) => {
              playSound(800, "square");
              setSelectedProject(proj);
            }}
          />
        </motion.section>

        {/* SECCIÓN FORMACIÓN ACADÉMICA & CERTIFICACIONES */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-block bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-[10px] font-mono px-3 py-1 rounded-md mb-2">
                APRENDIZAJE CONTINUO
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white">Formación Académica</h2>
              <p className="text-slate-400 text-sm mt-1">Mi trayectoria de crecimiento profesional y técnico en desarrollo de software</p>
            </div>

            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl font-mono text-xs">
              <button
                onClick={() => {
                  playSound(450);
                  setEducationTab("education");
                }}
                className={`px-5 py-2 rounded-lg transition-all ${
                  educationTab === "education"
                    ? "bg-[#00ff66] text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🎓 Educación
              </button>
              <button
                onClick={() => {
                  playSound(450);
                  setEducationTab("certifications");
                }}
                className={`px-5 py-2 rounded-lg transition-all ${
                  educationTab === "certifications"
                    ? "bg-[#00ff66] text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📜 Certificaciones ({CERTIFICATIONS_DATA.length})
              </button>
            </div>
          </div>

          {educationTab === "education" ? (
            <div className="grid grid-cols-1 gap-6">
              {EDUCATION_DATA.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 space-y-3 backdrop-blur-xl hover:border-[#00ff66]/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between text-xs font-mono text-slate-400">
                    <span className="text-[#00ff66] font-bold">{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <h4 className="text-[#00f0ff] font-mono font-bold text-sm">{item.institution}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATIONS_DATA.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 backdrop-blur-xl hover:border-[#00ff66] transition-all"
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#00ff66] font-bold">{cert.issuer}</span>
                    <span className="text-slate-400">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* MODAL HOLOGRÁFICO CON ENLACES DIRECTOS OFICIALES */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 border border-[#00ff66]/60 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-[0_0_70px_rgba(0,255,102,0.35)] relative"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-[#00ff66]">{"// PROYECTO SELECCIONADO"}</span>
                <button
                  onClick={() => {
                    playSound(300);
                    setSelectedProject(null);
                  }}
                  className="text-slate-400 hover:text-white font-mono text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black text-white">{selectedProject.title}</h3>
                <span className="text-xs font-mono text-[#00ff66] bg-[#00ff66]/10 border border-[#00ff66]/30 px-3.5 py-1.5 rounded-xl inline-block font-bold">
                  {selectedProject.category}
                </span>
                <p className="text-slate-300 text-base leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-slate-400">TECNOLOGÍAS DEL SISTEMA:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techs.map((t) => (
                    <span key={t} className="text-xs font-mono bg-slate-950 border border-slate-800 text-[#00ff66] px-3 py-1 rounded-lg">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound(850)}
                  className="px-7 py-3.5 text-xs font-mono font-bold text-black bg-[#00ff66] hover:bg-[#00f0ff] rounded-xl transition-all shadow-[0_0_25px_rgba(0,255,102,0.5)]"
                >
                  ABRIR ENLACE OFICIAL ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}