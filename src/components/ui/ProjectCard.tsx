"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import React, { useRef } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubUrl?: string;
    liveUrl?: string;
}

export default function ProjectCard({ title, description, tags, image, githubUrl, liveUrl }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Mouse coordinates
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth settings for tilt
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);
    
    // Map mouse position to rotation (-10 to 10 degrees max)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate relative position (-0.5 to 0.5)
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        
        x.set(relativeX);
        y.set(relativeY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-[380px] md:h-[450px] w-full glass overflow-visible rounded-2xl border border-white/5 hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all duration-300 cursor-pointer"
        >
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {/* Background Image */}
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 z-0"
                    />
                )}

                {/* Background Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,243,255,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_50%_0%,rgba(0,243,255,0.2),transparent)] transition-all"></div>

                {/* Visual Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 group-hover:opacity-30 transition-opacity">
                    <div className="absolute top-10 right-10 w-40 h-40 border border-neon-blue rounded-full shadow-[0_0_15px_#00f3ff]"></div>
                    <div className="absolute -top-10 -right-10 w-60 h-60 border border-neon-purple rounded-full shadow-[0_0_15px_#bc13fe]"></div>
                </div>
            </div>

            <div style={{ transform: "translateZ(60px)" }} className="relative z-20 p-8 h-full flex flex-col justify-end pointer-events-none">
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-neon-blue uppercase tracking-tighter border border-neon-blue/20 px-2 py-0.5 rounded backdrop-blur-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-3xl font-bold mb-3 tracking-tighter group-hover:text-neon-blue transition-colors text-shadow-glow">
                    {title}
                </h3>

                <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-sm font-light">
                    {description}
                </p>

                <div className="flex gap-4 pointer-events-auto">
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:text-neon-blue transition-colors">
                            <ExternalLink size={14} /> View Live
                        </a>
                    )}
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:text-neon-purple transition-colors">
                            <Github size={14} /> Github
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
