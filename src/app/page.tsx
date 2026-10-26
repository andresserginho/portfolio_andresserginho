'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { USER_PROFILE, METAVERSE_PROJECTS, MetaverseProject } from "@/data/portfolioData";

const MetaverseScene = dynamic(() => import("@/components/3d/MetaverseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] md:h-[80vh] flex flex-col items-center justify-center bg-[#01030d] rounded-3xl border border-cyan-500/30 shadow-2xl">
      <div className="w-16 h-16 border-4 border-[#00ff66] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#00ff66] font-mono text-sm tracking-widest animate-pulse">
        SINCRO-GALAXIA 3D INICIANDO...
      </p>
    </div>
  ),
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<MetaverseProject | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [time, setTime] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Reloj en tiempo real
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

  // Audio sintetizado cibernético
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
      // Ignorar restricciones de audio del navegador
    }
  };

  const filteredSkills =
    selectedCategory === "all"
      ? USER_PROFILE.skills
      : USER_PROFILE.skills.filter((s) => s.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#01030d] text-slate-100 selection:bg-[#00ff66] selection:text-black overflow-x-hidden font-sans">
      {/* Fondo Galáctico con Nebulosas */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,102,0.12),rgba(0,240,255,0.05),transparent_70%)]" />

      {/* BARRA SUPERIOR HUD HOLOGRÁFICA */}
      <nav className="sticky top-0 z-40 bg-[#01030d]/85 backdrop-blur-2xl border-b border-[#00ff66]/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#00ff66] animate-ping" />
            <span className="text-[#00ff66] font-bold tracking-widest">{"[ QUANTUM_CORE: ONLINE ]"}</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-400">
            <span>COL_TIME: <strong className="text-[#00ff66]">{time || "12:00:00"}</strong></span>
            <span>RENDER: <strong className="text-cyan-400">WEBGL 3D</strong></span>
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

        {/* HEADER / PERFIL CINEMATOGRÁFICO */}
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
            <a
              href={USER_PROFILE.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound(600)}
              className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl hover:border-[#00ff66] transition-colors"
            >
              📸 Instagram
            </a>
          </div>
        </motion.header>

        {/* SECCIÓN 3D: GALAXIA DEL METAVERSO */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="text-2xl md:text-4xl font-black flex items-center gap-3 text-white">
              <span className="text-[#00ff66] font-mono">&gt;</span> Galaxia 3D Interactiva de Proyectos
            </h2>
            <span className="text-xs font-mono text-cyan-300 border border-cyan-900 bg-cyan-950/50 px-4 py-1.5 rounded-full">
              Arrastra para explorar el espacio 3D • Zoom activo
            </span>
          </div>

          <MetaverseScene
            onSelectProject={(proj: MetaverseProject) => {
              playSound(800, "square");
              setSelectedProject(proj);
            }}
          />
        </motion.section>

        {/* PROYECTOS DESTACADOS EN TARJETAS NEÓN */}
        <section className="space-y-8">
          <h2 className="text-2xl md:text-4xl font-black flex items-center gap-3 text-white">
            <span className="text-[#00ff66] font-mono">&gt;</span> Estaciones y Proyectos Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {METAVERSE_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative bg-slate-900/70 border border-slate-800 hover:border-[#00ff66]/70 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,102,0.25)] flex flex-col justify-between backdrop-blur-xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00ff66] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 px-3.5 py-1.5 rounded-xl font-bold">
                      {project.badge}
                    </span>
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techs.map((t) => (
                      <span key={t} className="text-xs font-mono bg-slate-950/90 border border-slate-800 text-cyan-300 px-3 py-1 rounded-lg">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{project.category}</span>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound(520)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black bg-[#00ff66] hover:bg-[#00f0ff] px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)]"
                  >
                    VISITAR SITIO ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HABILIDADES & DOMINIO TECNOLÓGICO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-4xl font-black flex items-center gap-3 text-white">
              <span className="text-[#00ff66] font-mono">&gt;</span> Habilidades & Dominio Técnico
            </h2>

            {/* FILTROS INTERACTIVOS */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: "all", label: "TODOS" },
                { id: "frontend", label: "FRONTEND" },
                { id: "3d", label: "3D / WEBGL" },
                { id: "backend", label: "BACKEND" },
                { id: "database", label: "BASES DE DATOS" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playSound(400);
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#00ff66] text-black border-[#00ff66] font-bold shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-[#00ff66]/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSkills.map((skill) => (
              <div key={skill.name} className="space-y-2.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold text-sm">{skill.name}</span>
                  <span className="text-[#00ff66]">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9 }}
                    className="h-full bg-gradient-to-r from-[#00ff66] to-[#00f0ff] rounded-full shadow-[0_0_15px_rgba(0,255,102,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* MODAL HOLOGRÁFICO DE PROYECTO */}
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
                <span className="text-xs font-mono text-[#00ff66]">{"// NODO GALÁCTICO SELECCIONADO"}</span>
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