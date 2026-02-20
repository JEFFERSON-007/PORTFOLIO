"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest(".glass") ||
                target.closest("input, textarea")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[999] rounded-full mix-blend-difference"
            animate={{
                x: mousePos.x - 16,
                y: mousePos.y - 16,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "rgba(0, 243, 255, 0.4)" : "#fff",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
        >
            <div className="absolute inset-0 rounded-full border border-white opacity-20 scale-150"></div>
        </motion.div>
    );
}
