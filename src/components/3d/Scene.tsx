"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Preload, ScrollControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import Hero3D from "./Hero3D";

export default function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 35 }}
            gl={{ antialias: false, stencil: false, depth: true }}
            dpr={[1, 2]}
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

            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.5}
                    mipmapBlur
                    intensity={1.5}
                    radius={0.4}
                />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

            <Preload all />
        </Canvas>
    );
}
