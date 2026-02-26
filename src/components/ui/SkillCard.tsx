"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ReactNode } from "react";

interface SkillCardProps {
    title: string;
    icon: ReactNode;
    tags: string[];
    image?: string;
}

export default function SkillCard({ title, icon, tags, image }: SkillCardProps) {
    const [isMobile, setIsMobile] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    useEffect(() => {
        if (window.innerWidth < 768) setIsMobile(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-auto min-h-[300px] w-full glass neon-border-blue p-6 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-6 group overflow-hidden md:backdrop-blur-xl bg-black/60 md:bg-black/20"
        >
            {/* Background Image */}
            {image && (
                <>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover opacity-20 md:opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 z-0"
                    />
                    <div className="absolute inset-0 bg-black/50 md:bg-black/60 z-[1]"></div>
                </>
            )}

            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 text-5xl md:text-6xl text-neon-blue group-hover:text-neon-pink transition-colors duration-500"
            >
                {icon}
            </div>

            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className="relative z-10 text-center"
            >
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest">{title}</h3>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-2 text-[10px] uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/5 py-1 px-3 rounded-full transition-colors group/tag">
                            <img
                                src={`https://cdn.simpleicons.org/${tag.toLowerCase().replace('.', 'dot').replace(' ', '')}`}
                                alt={tag}
                                className="w-3 h-3 brightness-0 invert opacity-60 group-hover/tag:opacity-100 transition-opacity"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10"></div>
        </motion.div>
    );
}
