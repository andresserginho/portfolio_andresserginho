"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, MeshDistortMaterial, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { METAVERSE_PROJECTS, MetaverseProject } from "@/data/portfolioData";

interface MetaverseSceneProps {
  onSelectProject: (project: MetaverseProject) => void;
}

function GalaxyNode({
  project,
  onSelect,
}: {
  project: MetaverseProject;
  onSelect: (p: MetaverseProject) => void;
}) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.9;
      coreRef.current.rotation.x += delta * 0.4;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 1.5;
      ringRef1.current.rotation.x += delta * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 1.2;
      ringRef2.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <Float speed={3.5} rotationIntensity={1.8} floatIntensity={2.5} position={project.position}>
      {/* Anillo Orbital Cuántico 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.3, 0.03, 16, 100]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : project.color} transparent opacity={0.7} />
      </mesh>

      {/* Anillo Orbital Cuántico 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.4} />
      </mesh>

      {/* Núcleo Central del Nodo (Planeta / Estación 3D) */}
      <mesh
        ref={coreRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(project)}
        scale={hovered ? 1.4 : 1.0}
      >
        <icosahedronGeometry args={[0.85, 2]} />
        <MeshDistortMaterial
          color={hovered ? "#ffffff" : project.color}
          emissive={project.color}
          emissiveIntensity={hovered ? 1.8 : 0.7}
          roughness={0.05}
          metalness={0.95}
          speed={6}
          distort={0.35}
        />
      </mesh>

      {/* Título Holográfico 3D */}
      <Text
        position={[0, -1.7, 0]}
        fontSize={0.32}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {project.title}
      </Text>

      {/* Etiqueta de Categoría 3D */}
      <Text
        position={[0, -2.1, 0]}
        fontSize={0.17}
        color={project.color}
        anchorX="center"
        anchorY="middle"
      >
        {`>> ${project.category} <<`}
      </Text>
    </Float>
  );
}

export default function MetaverseScene({ onSelectProject }: MetaverseSceneProps) {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-[#01030d] shadow-[0_0_80px_rgba(0,255,102,0.15)]">
      {/* HUD de Coordenadas Galácticas en vivo */}
      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-cyan-500/50 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#00ff66] animate-ping" />
          <p className="text-xs font-mono text-[#00ff66] font-extrabold tracking-widest">
            {"GALAXY_SYSTEM_3D // ACTIVE_ORBIT"}
          </p>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 font-mono">
          Haz clic en cualquier nodo planetario para acceder
        </p>
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 55 }}>
        {/* Iluminación Profunda de Galaxia */}
        <color attach="background" args={["#01030d"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 20, 15]} intensity={3} color="#00ff66" />
        <pointLight position={[-15, -20, -15]} intensity={2.5} color="#00f0ff" />
        <pointLight position={[0, 15, -15]} intensity={2} color="#a855f7" />

        {/* Campo Estelar Infinito & Destellos Cuánticos */}
        <Stars radius={150} depth={80} count={6000} factor={5} saturation={1} fade speed={1.5} />
        <Sparkles count={150} scale={20} size={4} speed={0.5} color="#00ff66" />

        {/* Renderizado de Nodos Galácticos */}
        {METAVERSE_PROJECTS.map((proj) => (
          <GalaxyNode key={proj.id} project={proj} onSelect={onSelectProject} />
        ))}

        <OrbitControls
          enableZoom={true}
          maxDistance={14}
          minDistance={4}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}