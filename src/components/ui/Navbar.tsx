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
            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                // Simplified mobile scroll detection
                const sections = navItems.map(item => document.getElementById(item.id));
                const current = sections.findIndex(section => {
                    if (!section) return false;
                    const rect = section.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= window.innerHeight / 2;
                });
                if (current !== -1) setActiveSection(navItems[current].id);
            } else {
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

        const isMobile = window.innerWidth < 768;

        if (isMobile || id === "home") {
            gsap.to(window, { duration: 1.2, scrollTo: section.offsetTop, ease: "power2.inOut" });
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
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "py-4 bg-transparent backdrop-blur-sm" : "py-8 bg-transparent"
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
                initial={{ opacity: 0, x: "100%" }}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : "100%"
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[90] md:hidden bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-2xl uppercase tracking-[0.2em] font-bold transition-all ${activeSection === item.id ? "text-neon-blue" : "text-white/40"
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
                <button
                    onClick={() => scrollToSection("connect")}
                    className="mt-4 px-10 py-4 border border-neon-pink text-neon-pink uppercase tracking-widest font-bold rounded-full"
                >
                    Get in touch
                </button>
            </motion.div>
        </>
    );
}
