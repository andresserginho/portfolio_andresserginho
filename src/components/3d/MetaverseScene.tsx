// src/components/3d/MetaverseScene.tsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { METAVERSE_PROJECTS, MetaverseProject } from '@/data/portfolioData';

function NeonLogoHologram() {
  const texture = useLoader(THREE.TextureLoader, '/logo.png');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          alphaTest={0.1} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.35, 64]} />
        <meshBasicMaterial color="#00ff66" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function ProjectCard3D({
  project,
  angle,
  radius,
  onSelect,
  isModalOpen,
}: {
  project: MetaverseProject;
  angle: number;
  radius: number;
  onSelect: (proj: MetaverseProject) => void;
  isModalOpen: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <group position={[x, 0, z]}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'default'; }}
        >
          <planeGeometry args={[1.8, 2.4]} />
          <meshStandardMaterial
            color="#020617"
            emissive={project.color}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
          />

          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.8, 2.4)]} />
            <lineBasicMaterial color={project.color} linewidth={2} />
          </lineSegments>

          {!isModalOpen && (
            <Html position={[0, 0, 0.08]} center distanceFactor={14} transform>
              <div 
                onClick={() => onSelect(project)}
                className="w-44 h-60 p-4 rounded-2xl bg-slate-950/95 border border-slate-700/80 hover:border-[#00ff66] transition-all flex flex-col justify-between cursor-pointer select-none shadow-[0_0_25px_rgba(0,255,102,0.2)] backdrop-blur-xl group"
              >
                <div className="space-y-2">
                  <span 
                    className="text-[9px] font-mono px-2 py-0.5 rounded-md border font-bold inline-block shadow-sm"
                    style={{ color: project.color, borderColor: `${project.color}66`, backgroundColor: `${project.color}15` }}
                  >
                    {project.badge}
                  </span>
                  <h3 className="text-xs font-black text-white tracking-wide group-hover:text-[#00ff66] transition-colors">{project.title}</h3>
                  <p className="text-[10px] text-slate-300 line-clamp-3 leading-relaxed">{project.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {project.techs.slice(0, 3).map((t) => (
                      <span key={t} className="text-[8px] font-mono text-cyan-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-[#00ff66] font-bold text-right flex items-center justify-end gap-1">
                    EXPLORAR <span>↗</span>
                  </div>
                </div>
              </div>
            </Html>
          )}
        </mesh>
      </Float>
    </group>
  );
}

interface MetaverseSceneProps {
  onSelectProject: (proj: MetaverseProject) => void;
  isModalOpen: boolean;
}

export default function MetaverseScene({ onSelectProject, isModalOpen }: MetaverseSceneProps) {
  const radius = 13.0; // Radio amplio y panorámico
  const totalProjects = METAVERSE_PROJECTS.length;

  return (
    <div className="w-full h-[75vh] md:h-[85vh] bg-[#01030d] rounded-3xl border border-[#00ff66]/40 shadow-[0_0_90px_rgba(0,255,102,0.2)] overflow-hidden relative">
      <Canvas camera={{ position: [0, 4, 26], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#00ff66" />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#00f0ff" />

        <Stars radius={150} depth={80} count={10000} factor={5} saturation={0} fade speed={1.2} />

        <NeonLogoHologram />

        <group position={[0, -0.3, 0]}>
          {METAVERSE_PROJECTS.map((project, index) => {
            const angle = (index / totalProjects) * Math.PI * 2;
            return (
              <ProjectCard3D
                key={project.id}
                project={project}
                angle={angle}
                radius={radius}
                onSelect={onSelectProject}
                isModalOpen={isModalOpen}
              />
            );
          })}
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxDistance={32}
          minDistance={14}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
          autoRotate={!isModalOpen}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-[#00ff66]/50 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs font-mono text-[#00ff66] flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.3)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-ping" />
        <span>NEXT_GEN_CYBER_ORBIT // 3D_IMMERSIVE</span>
      </div>
    </div>
  );
}