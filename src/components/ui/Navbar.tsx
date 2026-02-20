"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Timeline", id: "timeline" },
    { name: "Connect", id: "connect" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const homeSection = document.getElementById("home");
            if (!homeSection) return;

            const scrollY = window.scrollY;
            const horizontalScrollStart = homeSection.offsetHeight;
            const scrollDistance = window.innerHeight * 4; // Matches +=400% in page.tsx
            const horizontalScrollEnd = horizontalScrollStart + scrollDistance;

            if (scrollY < horizontalScrollStart - 50) {
                setActiveSection("home");
            } else if (scrollY > horizontalScrollEnd - 50) {
                setActiveSection("connect");
            } else {
                const progress = (scrollY - horizontalScrollStart) / scrollDistance;
                const panelIds = ["about", "skills", "projects", "timeline", "connect"];
                // 5 panels, 4 transitions. Each transition is 100% vh.
                const panelIndex = Math.min(Math.max(Math.floor(progress * (panelIds.length - 1) + 0.5), 0), panelIds.length - 1);
                setActiveSection(panelIds[panelIndex]);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        if (id === "home") {
            gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "power2.inOut" });
            return;
        }

        const homeSection = document.getElementById("home");
        if (!homeSection) return;

        const horizontalScrollStart = homeSection.offsetHeight;
        const panelIds = ["about", "skills", "projects", "timeline", "connect"];
        const panelIndex = panelIds.indexOf(id);

        if (panelIndex !== -1) {
            const scrollDistance = window.innerHeight * 4;
            const scrollTarget = horizontalScrollStart + (panelIndex * (scrollDistance / (panelIds.length - 1)));

            gsap.to(window, {
                duration: 1.2,
                scrollTo: scrollTarget,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "py-4 bg-transparent" : "py-8 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
                <div className="w-10 h-10 md:hidden" /> {/* Spacer for flex centering if needed, but removing JR.A */}
                <div className="hidden md:block" />

                <div className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:text-neon-blue relative group ${activeSection === item.id ? "text-neon-blue" : "text-white/50"
                                }`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full ${activeSection === item.id ? "w-full" : ""
                                }`}></span>
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection("connect")}
                        className="ml-4 px-6 py-2 border border-neon-pink text-neon-pink text-[10px] uppercase tracking-widest font-bold hover:bg-neon-pink hover:text-white transition-all duration-500 rounded-full"
                    >
                        Signal
                    </button>
                </div>

                <div className="md:hidden text-white/50 text-[10px] uppercase tracking-widest">
                    Menu
                </div>
            </div>
        </motion.nav>
    );
}
