"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Code2, Cpu, Download, Globe, Mail, MapPin, Send, Phone } from "lucide-react";
import Typewriter from "typewriter-effect";

// Components
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });
const SkillCard = dynamic(() => import("@/components/ui/SkillCard"), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/ui/ProjectCard"), { ssr: false });
const Navbar = dynamic(() => import("@/components/ui/Navbar"), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/ui/ParticleBackground"), { ssr: false });


// Registration handled inside component

export default function Home() {
    const horizontalRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        gsap.registerPlugin(ScrollTrigger);

        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            ScrollTrigger.refresh();
        };

        ScrollTrigger.config({
            limitCallbacks: true,
            syncInterval: 100
        });

        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);

        if (!horizontalRef.current) return;

        const sections = gsap.utils.toArray(".panel");

        // GLOBAL: Horizontal Scroll logic
        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                scrub: isMobile ? true : 0.5, // Much more responsive on mobile touch
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.1, max: 0.5 },
                    delay: 0.05,
                    ease: "power1.inOut"
                },
                end: () => `+=${(sections.length - 1) * window.innerWidth}`,
                invalidateOnRefresh: true,
            }
        });

        // Panel Animations
        sections.forEach((section: any) => {
            const title = section.querySelector("h2");
            const content = section.querySelector(".panel-content");
            const cards = section.querySelectorAll(".group");

            if (title) {
                gsap.from(title, {
                    x: 100,
                    y: 30,
                    opacity: 0,
                    scrollTrigger: {
                        containerAnimation: scrollTween,
                        trigger: section,
                        start: "left center",
                        toggleActions: "play none none reverse",
                    }
                });
            }
            // Animate each section's content on entrance - Skip Connect section for reliability
            if (content && section.id !== 'connect') {
                gsap.from(content, {
                    y: 50,
                    opacity: 0,
                    delay: 0.2,
                    scrollTrigger: {
                        containerAnimation: scrollTween,
                        trigger: section,
                        start: "left center",
                        toggleActions: "play none none reverse",
                    }
                });
            } else if (content && section.id === 'connect') {
                // Ensure connect is always visible
                gsap.set(content, { opacity: 1, y: 0 });
            }
            if (cards.length > 0) {
                gsap.from(cards, {
                    y: 40,
                    opacity: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        containerAnimation: scrollTween,
                        trigger: section,
                        start: "left center",
                        toggleActions: "play none none reverse",
                    }
                });
            }
        });

        // Refresh after a short delay to ensure everything is rendered
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateIsMobile);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [mounted]);

    if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

    return (
        <main className="relative bg-[#050505] text-white selection:bg-neon-blue selection:text-black">
            <Navbar />
            <LoadingScreen />
            <CustomCursor />

            {/* 3D Background */}
            <div className="fixed inset-0 z-0">
                <Scene />
            </div>

            <div className="relative z-10">
                {/* HERO SECTION */}
                <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center p-6 text-center">
                    {!isMobile && <ParticleBackground />}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                        className="relative z-20"
                    >
                        <h1 className="text-[12vw] md:text-[12vw] font-black leading-[0.9] tracking-tighter uppercase neon-text-blue mb-6">
                            JEFFERSON<br />RAJA A
                        </h1>
                        <div className="text-[10px] md:text-2xl font-light tracking-[0.2em] md:tracking-[0.5em] uppercase text-neon-blue mb-10 md:mb-12 text-shadow-glow px-4">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Cybersecurity Specialist",
                                        "Software Developer",
                                        "SIH 2025 Winner",
                                        "Jefferson Raja A",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 50,
                                    wrapperClassName: "text-neon-blue",
                                    cursorClassName: "text-neon-blue"
                                }}
                            />
                        </div>

                        <div className="flex gap-6 md:gap-8 justify-center">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-bold text-white">15+</span>
                                <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-40">Projects</span>
                            </div>
                            <div className="w-[1px] h-10 md:h-12 bg-white/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-bold text-white">2025</span>
                                <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-40">SIH Winner</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-[2px] h-16 bg-gradient-to-b from-neon-blue to-transparent animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-[0.5em] mt-4 opacity-40">Slide Down</span>
                    </div>
                </section>

                {/* HORIZONTAL WRAPPER */}
                <div
                    id="horizontal-wrapper"
                    ref={horizontalRef}
                    className="horizontal-container-wrapper"
                    style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}
                >
                    <div
                        className="horizontal-container"
                        style={{ display: 'flex', flexDirection: 'row', width: '500vw', height: '100vh', minHeight: '100vh', maxHeight: '100vh', willChange: 'transform' }}
                    >

                        <section id="about" className="panel section py-0 w-screen">
                            <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-20 items-center px-4 md:px-10 h-full">
                                <div className="panel-content z-20 bg-black/60 md:bg-black/40 md:backdrop-blur-2xl p-6 md:p-12 rounded-[30px] md:rounded-[40px] border border-white/10 shadow-2xl order-2 md:order-1 overflow-y-auto max-h-[80vh] md:max-h-none mt-20 md:mt-0">
                                    <h2 className="text-3xl md:text-8xl font-black mb-6 neon-text-blue uppercase tracking-tighter">About</h2>
                                    <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-white">
                                        I am a <span className="text-neon-pink text-shadow-glow">Cybersecurity Specialist</span> and Software Developer dedicated to
                                        transforming complex security challenges into resilient, user-centric solutions.
                                    </p>
                                    <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                                        Deeply interested in emerging tech fields and want to learn new things, I combine defensive
                                        engineering with innovative application design to secure the digital frontier.
                                    </p>
                                    <p className="mt-6 text-xl font-bold text-neon-blue">Jefferson Raja</p>
                                </div>
                                <div className="relative glass rounded-3xl p-1 overflow-hidden group w-full max-w-[300px] md:max-w-md mx-auto order-1 md:order-2 aspect-[3/4] md:aspect-auto">
                                    <div className="absolute inset-0 bg-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="bg-white/5 rounded-[22px] h-full flex items-center justify-center border border-white/10 relative overflow-hidden">
                                        <Image
                                            src="profile.jpg"
                                            alt="Jefferson Raja"
                                            width={400}
                                            height={500}
                                            className="w-full h-full object-contain rounded-[21px] z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-700 p-1"
                                            priority
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-[10px] tracking-widest uppercase text-center p-8 z-0">
                                            Add &quot;profile.jpg&quot; to the public folder
                                        </div>
                                        <Cpu size={120} className="absolute text-neon-blue opacity-5 z-0 group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SKILLS PANEL */}
                        <section id="skills" className="panel section px-4 md:px-10 w-screen">
                            <div className="w-full max-w-6xl panel-content overflow-y-auto max-h-[85vh] md:max-h-none px-2 pb-20 md:pb-0">
                                <div className="flex justify-between items-end mb-10 md:mb-16">
                                    <h2 className="text-3xl md:text-8xl font-black neon-text-blue uppercase tracking-tighter">Skills</h2>
                                    <p className="text-neon-blue uppercase tracking-widest text-[10px] mb-4 opacity-60">Core Technologies</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                    <SkillCard
                                        title="Cybersecurity"
                                        icon={<Cpu />}
                                        tags={["Linux", "Python", "Wireshark", "Metasploit", "Gnubash"]}
                                        image="skill-sec.png"
                                    />
                                    <SkillCard
                                        title="Web Dev"
                                        icon={<Globe />}
                                        tags={["React", "Nextdotjs", "Javascript", "Html5", "Tailwindcss"]}
                                        image="skill-web.png"
                                    />
                                    <SkillCard
                                        title="Engineering"
                                        icon={<Code2 />}
                                        tags={["Cplusplus", "C", "Java", "Python", "Android"]}
                                        image="skill-eng.png"
                                    />
                                    <SkillCard
                                        title="Data & Core"
                                        icon={<Cpu />}
                                        tags={["Postgresql", "Mysql", "Git", "Tensorflow", "Nvidia"]}
                                        image="skill-data.png"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* PROJECTS PANEL */}
                        <section id="projects" className="panel section px-4 md:px-10 w-screen">
                            <div className="w-full max-w-6xl panel-content overflow-y-auto max-h-[85vh] md:max-h-none px-2 pb-20 md:pb-0">
                                <h2 className="text-3xl md:text-8xl font-black mb-10 md:mb-16 text-right neon-text-blue uppercase tracking-tighter">Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                    <ProjectCard
                                        title="Dataset Visualizer"
                                        description="Advanced tool for data visualization and preprocessing with interactive 3D graphs."
                                        tags={["Python", "ML", "Tooling"]}
                                        image="project-1.png"
                                        githubUrl="https://github.com/JEFFERSON-007/dataset-visualition-and-preprocessing-tool"
                                    />
                                    <ProjectCard
                                        title="Phishing Shield"
                                        description="Professional browser extension with multi-layered detection for secure browsing."
                                        tags={["Security", "Extension", "JS"]}
                                        image="project-2.png"
                                        githubUrl="https://github.com/JEFFERSON-007/phishing-extension"
                                    />
                                    <ProjectCard
                                        title="Pentest Toolkit"
                                        description="Comprehensive penetration testing suite for infrastructure vulnerability assessment."
                                        tags={["Cybersec", "Python", "NetSec"]}
                                        image="project-3.png"
                                        githubUrl="https://github.com/JEFFERSON-007/PENETRATION-TESTING-TOOLKIT"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* EXPERIENCE PANEL */}
                        <section id="timeline" className="panel section px-4 md:px-10 w-screen">
                            <div className="max-w-4xl w-full panel-content overflow-y-auto max-h-[85vh] md:max-h-none px-2 pb-20 md:pb-0">
                                <h2 className="text-3xl md:text-7xl font-bold mb-10 md:mb-12 text-neon-purple uppercase tracking-tighter">Timeline</h2>
                                <div className="space-y-12 border-l-2 border-white/10 pl-8 md:pl-12 ml-4 md:ml-6">
                                    {[
                                        { year: "2026", role: "Aurelion - 3rd Winner", company: "Technical Symposium" },
                                        { year: "2025", role: "Smart India Hackathon Winner", company: "National Finale" },
                                        { year: "2024", role: "Cyberthon Finalist", company: "Cybersecurity Competition" },
                                        { year: "2024", role: "Codsoft Internship", company: "Web Development" },
                                        { year: "2024", role: "Codtech Internship", company: "Cybersecurity" }
                                    ].map((exp, i) => (
                                        <motion.div key={i} className="relative group">
                                            <div className="absolute -left-[45px] md:-left-[61px] top-2 w-4 h-4 md:w-5 md:h-5 bg-[#050505] border-2 border-neon-purple rounded-full group-hover:bg-neon-purple transition-colors"></div>
                                            <span className="text-neon-purple font-mono text-lg md:text-xl">{exp.year}</span>
                                            <h3 className="text-2xl md:text-3xl font-bold mt-2">{exp.role}</h3>
                                            <p className="text-lg md:text-xl opacity-40 italic">{exp.company}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* CONTACT PANEL */}
                        <section id="connect" className="panel section px-4 md:px-10 w-screen">
                            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 panel-content overflow-y-auto max-h-[85vh] md:max-h-none pr-4">
                                <div>
                                    <h2 className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 text-neon-pink uppercase tracking-tighter">Connect</h2>
                                    <p className="text-lg md:text-xl opacity-60 mb-12 max-w-sm">
                                        Ready to launch your next digital venture into the stratosphere? Send a signal.
                                    </p>
                                    <div className="space-y-6">
                                        <a href="mailto:mariyalpackiajothi@gmail.com" className="flex items-center gap-4 text-lg hover:text-neon-pink transition-colors group">
                                            <Mail className="text-neon-pink group-hover:scale-110 transition-transform" />
                                            <span>mariyalpackiajothi@gmail.com</span>
                                        </a>
                                        <div className="flex items-center gap-4 text-lg">
                                            <Phone className="text-neon-pink" />
                                            <span>+91 8778646082</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-lg">
                                            <MapPin className="text-neon-pink" />
                                            <span>Coimbatore</span>
                                        </div>
                                        <div className="flex flex-wrap gap-6 mt-8">
                                            <a href="https://github.com/JEFFERSON-007" target="_blank" className="hover:text-neon-blue transition-colors text-[10px] uppercase tracking-widest font-bold">GitHub</a>
                                            <a href="https://www.linkedin.com/in/jefferson-raja-a-170740323/" target="_blank" className="hover:text-neon-blue transition-colors text-[10px] uppercase tracking-widest font-bold">LinkedIn</a>
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-white/5">
                                            <a
                                                href="mailto:mariyalpackiajothi@gmail.com?subject=Portfolio Signal"
                                                className="inline-flex items-center gap-4 px-8 py-4 bg-neon-pink text-white font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] !opacity-100"
                                            >
                                                <Mail size={20} />
                                                Signal Now
                                            </a>
                                            <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 mt-4 leading-relaxed">
                                                Click to open your mail app directly.<br />
                                                Or manual copy: <span className="text-neon-pink select-all">mariyalpackiajothi@gmail.com</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass p-6 md:p-10 neon-border-blue relative overflow-hidden mt-10 md:mt-0">
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl"></div>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        setStatus("sending");
                                        const form = e.target as HTMLFormElement;
                                        const formData = new FormData(form);
                                        const data = Object.fromEntries(formData.entries());

                                        try {
                                            const res = await fetch("https://formsubmit.co/ajax/mariyalpackiajothi@gmail.com", {
                                                method: "POST",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                                body: JSON.stringify(data)
                                            });

                                            if (res.ok) {
                                                setStatus("sent");
                                                form.reset();
                                                setTimeout(() => setStatus("idle"), 5000);
                                            } else {
                                                throw new Error("Failed to send");
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            setStatus("error");
                                            setTimeout(() => setStatus("idle"), 5000);
                                            // Fallback to mailto on error
                                            const subject = encodeURIComponent(`Portfolio Signal: ${data.inquiry}`);
                                            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nInquiry: ${data.inquiry}\n\nMessage:\n${data.message}`);
                                            window.location.href = `mailto:mariyalpackiajothi@gmail.com?subject=${subject}&body=${body}`;
                                        }
                                    }} className="relative z-10 space-y-6 pb-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest opacity-40">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="w-full bg-white/5 border-b border-white/20 p-3 focus:border-neon-pink outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest opacity-40">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="w-full bg-white/5 border-b border-white/20 p-3 focus:border-neon-pink outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest opacity-40">Inquiry Type</label>
                                            <select
                                                name="inquiry"
                                                className="w-full bg-black/80 border-b border-white/20 p-3 focus:border-neon-pink outline-none transition-colors appearance-none text-white/60"
                                            >
                                                <option>Project Request</option>
                                                <option>Collaboration</option>
                                                <option>Just Saying Hi</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest opacity-40">Message</label>
                                            <textarea
                                                name="message"
                                                required
                                                className="w-full bg-white/5 border-b border-white/20 p-3 h-32 focus:border-neon-pink outline-none transition-colors resize-none"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className={`flex items-center justify-center gap-3 w-full font-bold py-5 uppercase tracking-[0.4em] transition-all duration-500 !opacity-100 relative z-30 ${status === "sent" ? "bg-green-500 text-white" :
                                                status === "error" ? "bg-red-500 text-white" :
                                                    status === "sending" ? "bg-gray-500 text-white animate-pulse" :
                                                        "bg-white text-black hover:bg-neon-pink hover:text-white"
                                                }`}
                                        >
                                            {status === "sending" ? "TRANSMITTING..." :
                                                status === "sent" ? "SIGNAL SENT!" :
                                                    status === "error" ? "FAILED (TRYING MAILTO...)" :
                                                        <>Transmit <Send size={18} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" /></>}
                                        </button>
                                        <div className="text-center mt-4">
                                            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Trouble with the button?</p>
                                            <a
                                                href="mailto:mariyalpackiajothi@gmail.com?subject=Portfolio Inquiry"
                                                className="text-[10px] uppercase tracking-[0.3em] text-neon-pink hover:text-neon-blue transition-colors underline underline-offset-4"
                                            >
                                                Send direct email instead
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

                {/* FOOTER */}
                <footer className="relative z-50 p-10 bg-transparent text-center text-[11px] uppercase tracking-[0.5em] text-white/70">
                    <div className="max-w-7xl mx-auto">
                        © 2026 JEFFERSON RAJA A • All Rights Reserved
                    </div>
                </footer>
            </div >

            {/* FORCE SYNC CSS - App Router compatible injection */}
            < style dangerouslySetInnerHTML={{
                __html: `
                .panel { 
                    width: 100vw !important; 
                    flex-shrink: 0 !important; 
                    height: 100vh !important;
                }
                section { 
                    height: 100vh !important; 
                    width: 100vw !important;
                }
                .horizontal-container {
                    display: flex !important;
                    flex-direction: row !important;
                }
            ` }
            } />
        </main >
    );
}
