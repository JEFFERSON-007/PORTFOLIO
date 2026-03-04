"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={`fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center ${progress === 100 ? "pointer-events-none" : ""}`}
                    exit={{ opacity: 0, y: -100, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Neon Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)] animate-pulse"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative w-64 md:w-80 h-[1px] bg-white/5 mb-12 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <motion.div
                                className="absolute h-full bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_15px_#00f3ff]"
                                style={{ width: `${progress}%` }}
                            />
                            {/* Scanning line effect */}
                            <motion.div
                                className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ left: ["-20%", "120%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "1em" }}
                                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                                className="text-[10px] md:text-xs font-black uppercase text-neon-blue tracking-[0.5em] mb-2"
                            >
                                System Initializing
                            </motion.div>
                            <div className="relative">
                                <motion.span
                                    className="text-6xl md:text-8xl font-black text-white/90 tabular-nums"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    {progress}
                                </motion.span>
                                <span className="absolute -right-8 top-2 text-xl font-bold text-neon-blue/40">%</span>
                            </div>
                        </div>
                    </div>


                </motion.div>
            )}
        </AnimatePresence>
    );
}
