"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3D() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Generate random particles
    const particleCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (sphereRef.current) {
            sphereRef.current.rotation.x = time * 0.2;
            sphereRef.current.rotation.y = time * 0.3;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.z = time * 0.05;
            particlesRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }

        // Mouse parallax
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={sphereRef} args={[1, 100, 100]} scale={1.5}>
                    <MeshDistortMaterial
                        color="#00f3ff"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={1}
                        emissive="#bc13fe"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            </Float>

            {/* Background Particles */}
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
        </>
    );
}
