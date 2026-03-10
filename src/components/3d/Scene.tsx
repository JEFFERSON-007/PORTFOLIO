"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Preload, ScrollControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useState, useEffect } from "react";
import Hero3D from "./Hero3D";

export default function Scene() {
    const [isLowEnd, setIsLowEnd] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) setIsLowEnd(true);
    }, []);

    return (
        <Canvas
            shadows
            camera={{
                position: [0, 0, 5],
                fov: 35
            }}
            gl={{
                antialias: false,
                stencil: false,
                depth: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false
            }}
            dpr={isLowEnd ? 1 : (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1)}
            onCreated={({ camera }) => {
                if (window.innerWidth < 768) {
                    camera.position.z = 10;
                    (camera as any).fov = 50;
                    camera.updateProjectionMatrix();
                }
            }}
        >
            <color attach="background" args={["#050505"]} />
            <fog attach="fog" args={["#050505", 5, 15]} />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f3ff" />

            <Suspense fallback={null}>
                <Hero3D />
                <Environment preset="city" />
            </Suspense>

            {!isLowEnd ? (
                <EffectComposer enableNormalPass={false}>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.4}
                    />
                    <Noise opacity={0.08} />
                    <Vignette eskil={false} offset={0.1} darkness={1.2} />
                </EffectComposer>
            ) : null}

            <Preload all />
        </Canvas>
    );
}
