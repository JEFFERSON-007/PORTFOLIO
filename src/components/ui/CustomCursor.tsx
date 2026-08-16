"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    
    // Target element to track for magnetic effect
    const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null);

    // Use motion values for smoother, higher performance animations
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 450, mass: 0.1 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            let targetX = e.clientX - 16;
            let targetY = e.clientY - 16;

            if (hoverTarget) {
                // Magnetic effect: subtly pull the cursor towards the center of the hovered element
                const rect = hoverTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Pull cursor 30% towards the center of the element
                targetX = targetX + (centerX - e.clientX) * 0.3;
                targetY = targetY + (centerY - e.clientY) * 0.3;
            }

            cursorX.set(targetX);
            cursorY.set(targetY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Identify elements we want to make "magnetic"
            const interactive = target.closest("button, a, .glass, input, textarea") as HTMLElement;
            
            if (interactive) {
                setIsHovering(true);
                setHoverTarget(interactive);
            } else {
                setIsHovering(false);
                setHoverTarget(null);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, hoverTarget]);

    if (isTouch) return null;

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[999] rounded-full mix-blend-difference"
            style={{
                x: springX,
                y: springY,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "rgba(0, 243, 255, 0.4)" : "#fff",
            }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white opacity-20"></div>
        </motion.div>
    );
}
