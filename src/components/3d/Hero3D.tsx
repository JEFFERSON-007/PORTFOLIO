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

    const smoothedScroll = useRef(0);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const targetScroll = typeof window !== "undefined" ? window.scrollY : 0;

        // Lerp scroll value for butter-smooth movement
        smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, targetScroll, 0.05);

        const scrollRotation = (smoothedScroll.current / (window.innerHeight * 4)) * Math.PI * 2;
        const scrollPosition = (smoothedScroll.current / window.innerHeight) * 2;

        if (sphereRef.current) {
            // Intense spin + smooth scroll rotation
            sphereRef.current.rotation.x = time * 0.15 + scrollRotation;
            sphereRef.current.rotation.y = time * 0.2 + scrollRotation * 1.5;

            // Pulsing position + Scroll movement
            sphereRef.current.position.y = Math.sin(time * 0.8) * 0.3 - (scrollPosition * 0.5);
            sphereRef.current.position.z = Math.cos(time * 0.5) * 0.5;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.z = time * 0.02 + scrollRotation * 0.1;
            particlesRef.current.position.y = - (scrollPosition * 0.2);
        }

        // Camera dynamics: Mouse + Scroll Depth + Pulse
        const targetCamZ = 5 - (scrollPosition * 0.5) + Math.sin(time * 0.5) * 0.5;
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 3, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * 3) - (scrollPosition * 0.2), 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={sphereRef} args={[1, 128, 128]} scale={1.8}>
                    <MeshDistortMaterial
                        color="#00f3ff"
                        attach="material"
                        distort={0.5}
                        speed={3}
                        roughness={0}
                        metalness={1}
                        emissive="#bc13fe"
                        emissiveIntensity={0.8}
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
