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
                    className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center"
                    exit={{ opacity: 0, y: -100, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="relative w-64 h-[2px] bg-white/10 mb-8 overflow-hidden">
                        <motion.div
                            className="absolute h-full bg-neon-blue"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            className="text-lg md:text-2xl font-bold tracking-[0.4em] uppercase text-neon-blue text-center mb-2"
                        >
                            Initializing...
                        </motion.p>
                        <motion.span 
                            className="text-4xl md:text-6xl font-black text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {progress}%
                        </motion.span>
                    </div>


                </motion.div>
            )}
        </AnimatePresence>
    );
}
