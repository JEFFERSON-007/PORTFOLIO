"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubUrl?: string;
    liveUrl?: string;
}

export default function ProjectCard({ title, description, tags, image, githubUrl, liveUrl }: ProjectCardProps) {
    return (
        <motion.div
            className="group relative h-[400px] md:h-[450px] w-full glass overflow-hidden rounded-2xl border border-white/5 hover:border-neon-blue/30 transition-all duration-500"
            whileHover={{ y: -10 }}
        >
            {/* Background Image */}
            {image && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}

            {/* Background Graphic */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,243,255,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_50%_0%,rgba(0,243,255,0.2),transparent)] transition-all"></div>

            {/* Visual Pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute top-10 right-10 w-40 h-40 border border-neon-blue rounded-full"></div>
                <div className="absolute -top-10 -right-10 w-60 h-60 border border-neon-purple rounded-full"></div>
            </div>

            <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                <div className="flex gap-2 mb-4">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-neon-blue uppercase tracking-tighter border border-neon-blue/20 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-3xl font-bold mb-3 tracking-tighter group-hover:text-neon-blue transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-foreground/60 leading-relaxed mb-6 max-w-sm">
                    {description}
                </p>

                <div className="flex gap-4">
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:text-neon-blue transition-colors">
                            <ExternalLink size={14} /> View Live
                        </a>
                    )}
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:text-neon-purple transition-colors">
                            <Github size={14} /> Github
                        </a>
                    )}
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </motion.div>
    );
}
