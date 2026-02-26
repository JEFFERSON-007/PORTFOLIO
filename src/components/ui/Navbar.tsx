"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Menu, X } from "lucide-react";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const homeSection = document.getElementById("home");
            if (!homeSection) return;

            const scrollY = window.scrollY;
            const horizontalScrollStart = homeSection.offsetHeight;
            const scrollDistance = window.innerHeight * 4;
            const horizontalScrollEnd = horizontalScrollStart + scrollDistance;

            if (scrollY < horizontalScrollStart - 50) {
                setActiveSection("home");
            } else if (scrollY > horizontalScrollEnd - 50) {
                setActiveSection("connect");
            } else {
                const progress = (scrollY - horizontalScrollStart) / scrollDistance;
                const panelIds = ["about", "skills", "projects", "timeline", "connect"];
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
        setIsMobileMenuOpen(false);
        const section = document.getElementById(id);
        if (!section) return;

        if (id === "home") {
            gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "power2.inOut" });
        } else {
            const homeSection = document.getElementById("home");
            if (!homeSection) return;
            const horizontalScrollStart = homeSection.offsetHeight;
            const panelIds = ["about", "skills", "projects", "timeline", "connect"];
            const panelIndex = panelIds.indexOf(id);

            if (panelIndex !== -1) {
                const scrollDistance = window.innerHeight * 4;
                const scrollTarget = horizontalScrollStart + (panelIndex * (scrollDistance / (panelIds.length - 1)));
                gsap.to(window, { duration: 1.2, scrollTo: scrollTarget, ease: "power2.inOut" });
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "py-4 bg-transparent" : "py-8 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                    <div className="w-10 h-10" /> {/* Empty top-left corner */}

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

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    scale: isMobileMenuOpen ? 1 : 0.9,
                    y: isMobileMenuOpen ? 0 : 20,
                    pointerEvents: isMobileMenuOpen ? "all" : "none"
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[90] md:hidden bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-10"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.1),transparent)] opacity-50"></div>

                {navItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            y: isMobileMenuOpen ? 0 : 20
                        }}
                        transition={{ delay: isMobileMenuOpen ? 0.1 + index * 0.1 : 0 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-lg uppercase tracking-[0.4em] font-black transition-all hover:text-neon-blue relative group w-full text-center py-1 ${activeSection === item.id ? "text-neon-blue" : "text-white/40"
                            }`}
                    >
                        {item.name}
                        {activeSection === item.id && (
                            <motion.span
                                layoutId="activeMobileNav"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]"
                            />
                        )}
                    </motion.button>
                ))}

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: isMobileMenuOpen ? 1 : 0,
                        y: isMobileMenuOpen ? 0 : 20
                    }}
                    transition={{ delay: isMobileMenuOpen ? 0.1 + navItems.length * 0.1 : 0 }}
                    onClick={() => scrollToSection("connect")}
                    className="mt-8 px-12 py-4 bg-neon-pink/10 border border-neon-pink text-neon-pink uppercase tracking-widest font-black rounded-full shadow-[0_0_20px_rgba(255,0,255,0.2)]"
                >
                    Get in touch
                </motion.button>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/20">
                    Jefferson Raja A
                </div>
            </motion.div>
        </>
    );
}
