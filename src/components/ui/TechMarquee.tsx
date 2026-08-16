"use client";

import { motion } from "framer-motion";

export default function TechMarquee() {
    const coreSkills = [
        "NEXT.JS", "REACT", "THREE.JS", "GSAP", "TAILWIND CSS", 
        "PYTORCH", "TYPESCRIPT", "CYBERSECURITY", "NODE.JS", "FRAMER MOTION",
        "PYTHON", "C++"
    ];

    // Create a very long array so it fills ultra-wide screens
    // We duplicate the core skills multiple times.
    const marqueeSkills = [...coreSkills, ...coreSkills, ...coreSkills, ...coreSkills, ...coreSkills, ...coreSkills];

    return (
        <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-4 relative z-20">
            {/* Gradient masks for smooth fade in/out on edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <motion.div
                className="flex whitespace-nowrap w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
                {marqueeSkills.map((skill, index) => (
                    <div key={index} className="flex items-center px-6">
                        <span className="text-lg md:text-2xl font-black text-white/30 tracking-[0.2em] uppercase hover:text-neon-pink hover:text-shadow-glow transition-all duration-300 cursor-default">
                            {skill}
                        </span>
                        <span className="mx-6 text-neon-blue/30 text-xl">•</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
