"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3D() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);
    const [scale, setScale] = useState(1.8);

    const [particleCount, setParticleCount] = useState(1500);
    const [segments, setSegments] = useState(128);
    const [isMobile, setIsMobile] = useState(false);
    const [positions, setPositions] = useState<Float32Array>(new Float32Array(0));

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
            setParticleCount(500);
            setSegments(24);
        } else {
            setIsMobile(false);
            setParticleCount(1500);
            setSegments(64);
        }

        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        setPositions(pos);
    }, []);

    const smoothedScroll = useRef(0);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const targetScroll = typeof window !== "undefined" ? window.scrollY : 0;

        // Butter-smooth damping: Consistent speed regardless of monitor FPS (60Hz vs 144Hz)
        smoothedScroll.current = THREE.MathUtils.damp(smoothedScroll.current, targetScroll, 4, delta);

        const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
        const scrollRotation = (smoothedScroll.current / (vh * 4)) * Math.PI * 2;
        const scrollPosition = (smoothedScroll.current / vh) * 2;

        if (sphereRef.current) {
            // Smooth rotations
            sphereRef.current.rotation.x = THREE.MathUtils.damp(sphereRef.current.rotation.x, time * 0.15 + scrollRotation, 2, delta);
            sphereRef.current.rotation.y = THREE.MathUtils.damp(sphereRef.current.rotation.y, time * 0.2 + scrollRotation * 1.5, 2, delta);

            // Smooth positioning
            const targetY = Math.sin(time * 0.8) * 0.3 - (scrollPosition * 0.5);
            const targetZ = Math.cos(time * 0.5) * 0.5;
            sphereRef.current.position.y = THREE.MathUtils.damp(sphereRef.current.position.y, targetY, 2, delta);
            sphereRef.current.position.z = THREE.MathUtils.damp(sphereRef.current.position.z, targetZ, 2, delta);
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.z = THREE.MathUtils.damp(particlesRef.current.rotation.z, time * 0.02 + scrollRotation * 0.1, 1, delta);
            particlesRef.current.position.y = THREE.MathUtils.damp(particlesRef.current.position.y, -(scrollPosition * 0.2), 1, delta);
        }

        if (!isMobile) {
            // Camera Dynamics: Smooth Mouse + Scroll Depth
            const targetCamZ = 5 - (scrollPosition * 0.5) + Math.sin(time * 0.5) * 0.5;
            state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 2, delta);
            state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.mouse.x * 2.5, 2, delta);
            state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, (state.mouse.y * 2.5) - (scrollPosition * 0.2), 2, delta);
            state.camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={sphereRef} args={[1, segments, segments]} scale={scale}>
                    {isMobile ? (
                        <meshPhongMaterial
                            color="#00f3ff"
                            emissive="#bc13fe"
                            emissiveIntensity={0.5}
                            shininess={100}
                        />
                    ) : (
                        <MeshDistortMaterial
                            color="#00f3ff"
                            attach="material"
                            distort={0.5}
                            speed={3}
                            roughness={0}
                            metalness={1}
                            emissive="#bc13fe"
                            emissiveIntensity={0.4}
                        />
                    )}
                </Sphere>
            </Float>

            {/* Background Particles */}
            {positions.length > 0 && (
                <Points ref={particlesRef} positions={positions} stride={3}>
                    <PointMaterial
                        transparent
                        color="#ffffff"
                        size={0.02}
                        sizeAttenuation={true}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </Points>
            )}
        </>
    );
}
