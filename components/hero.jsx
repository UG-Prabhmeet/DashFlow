import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import faqData from "@/data/faqs.json";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

const Hero = () => (
    <>
        {/* HERO SECTION */}
        <section
            className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center px-4 hero-mesh"
            style={{ backgroundImage: "url('/hero_background.jpg')" }}
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] animate-pulse delay-700" />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0" />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                <div className="mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
                    <span className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                        Built for next-gen teams
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-glow animate-reveal" style={{ animationDelay: "0.2s" }}>
                    <span className="inline-block gradient-title text-white">Streamline Agile Projects</span>
                    <br />
                    <span className="gradient-title text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-200">
                        with DashFlow
                    </span>
                </h1>

                <p className="text-white mt-2 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
                    Real-time collaboration. Visual progress. Powerful reports.
                    <br />
                    Experience high-performance project management.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-reveal" style={{ animationDelay: "0.4s" }}>
                    <SignInButton forceRedirectUrl="/onboarding">
                        <button className="glow-button group relative bg-white text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </SignInButton>
                    <Link
                        href="https://github.com/UG-Prabhmeet/DashFlow"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group bg-zinc-900/50 backdrop-blur-xl text-white font-bold px-8 py-3 rounded-full border border-white/10 flex items-center gap-2 transition-all hover:bg-zinc-800 hover:border-white/20">
                            <FaGithub className="w-5 h-5" />
                            View on GitHub
                        </button>
                    </Link>
                </div>
            </div>
            
            {/* Subtle Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
            </div>
        </section>
        <section className="w-full relative py-32 px-4 bg-[#050505] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                {/* Left: Main Text */}
                <div className="flex-1 flex flex-col justify-center animate-reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                        We streamline
                        <br />
                        <span className="text-blue-500">your workflow.</span>
                        <br />
                        So your team can
                        <br />
                        <span className="text-purple-500">focus on building.</span>
                    </h2>
                    <p className="text-zinc-400 text-xl mb-10 leading-relaxed">
                        DashFlow makes project planning, task tracking, and team
                        collaboration seamless—out of the box. No more friction, 
                        just pure productivity.
                    </p>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 animate-reveal" style={{ animationDelay: "0.2s" }}>
                    {[
                        "Sprint planning", "Real-time sync", "Custom workflows", 
                        "Drag & drop tasks", "Role-based access", "Task dependencies",
                        "Timeline view", "Issue tracking", "Team chat", 
                        "Analytics & reporting"
                    ].map((item, i) => (
                        <div key={i} className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all hover:-translate-y-1">
                            <p className="text-zinc-100 font-semibold tracking-tight">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <section className="bg-black text-white py-24 px-4">
            <h2 className="text-4xl md:text-5xl gradient-title text-center mb-20">
                Why You Will Love It
            </h2>

            {/* Feature 1: Kanban Board */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-24">
                <div className="flex-1 text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                        Effortless Task Management
                    </h3>
                    <p className="text-zinc-300 text-lg mb-4">
                        Visualize your entire workflow in one dynamic Kanban
                        board. Move tasks with drag-and-drop ease, assign issues
                        to team members, and track progress from backlog to done
                        — all in real-time.
                    </p>
                    <ul className="text-zinc-400 list-disc pl-5 space-y-1 text-base">
                        <li>Column-based board for clear stage visibility</li>
                        <li>Real-time collaboration & instant sync</li>
                        <li>Drag-and-drop interaction</li>
                        <li>Filter tasks by status, priority, or assignee</li>
                    </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden w-full max-w-xl shadow-lg aspect-video">
                    <Image
                        src="/kanban_board.png"
                        alt="Kanban board interface"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Feature 2: Sprint Analytics */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-24">
                <div className="flex-1 flex justify-center">
                    <div className="relative rounded-2xl overflow-hidden w-full max-w-xl shadow-lg aspect-video">
                        <Image
                            src="/sprint_analytics.png"
                            alt="Sprint analytics dashboard"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="flex-1 text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                        Data-Driven Sprint Analytics
                    </h3>
                    <p className="text-zinc-300 text-lg mb-4">
                        Stay ahead with detailed sprint metrics. Track team
                        velocity, burndown rates, lead time, and more — with
                        charts that auto-update to reflect real-time progress
                        and blockers.
                    </p>
                    <ul className="text-zinc-400 list-disc pl-5 space-y-1 text-base">
                        <li>Visual burndown and velocity charts</li>
                        <li>Identify bottlenecks early</li>
                        <li>Exportable sprint reports</li>
                        <li>Measure team efficiency over time</li>
                    </ul>
                </div>
            </div>

            {/* Feature 3: Organisation Projects Page */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                        Unified Project Overview
                    </h3>
                    <p className="text-zinc-300 text-lg mb-4">
                        See everything your team is working on across all
                        projects in one place. Easily navigate between active
                        sprints, archived tasks, and organization-level metrics.
                    </p>
                    <ul className="text-zinc-400 list-disc pl-5 space-y-1 text-base">
                        <li>Centralized view of all organization projects</li>
                        <li>
                            Quick access to each project's board, settings, and
                            members
                        </li>
                        <li>Role-based visibility and controls</li>
                        <li>Ideal for cross-functional teams and managers</li>
                    </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden w-full max-w-xl shadow-lg aspect-video">
                    <Image
                        src="/organization_projects.png"
                        alt="Organization projects overview"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
        <section className="bg-black text-white py-24 px-4">
            <h2 className="text-4xl md:text-5xl gradient-title text-center mb-16 text-zinc-100">
                Learn More About Building Better Teams
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature: Project Overview */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <div className="relative w-full h-48 bg-zinc-800">
                        <Image
                            src="/project_overview.png"
                            alt="Project Overview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            OVERVIEW
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            Stay on Top with a Project Overview That Makes Sense
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Get a bird’s-eye view of everything — tasks,
                            timelines, statuses, and goals — across your
                            project, all in one centralized dashboard.
                        </p>
                    </div>
                </div>

                {/* Feature: Activity Log */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <div className="relative w-full h-48 bg-zinc-800">
                        <Image
                            src="/activity_log.png"
                            alt="Activity Log"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            ACTIVITY
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            Trace Every Move with Real-Time Activity Logs
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Whether it's a task update or a sprint change, keep
                            track of every action with clear, timestamped logs
                            that make team accountability effortless.
                        </p>
                    </div>
                </div>

                {/* Feature: Clerk Organization Support */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <div className="relative w-full h-48 bg-zinc-800">
                        <Image
                            src="/clerk_invitation.png"
                            alt="Clerk organization support"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            ACCESS CONTROL
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            Scalable Organization Management with Clerk
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Support multiple organizations per user, invite
                            teammates with a few clicks, and control access by
                            roles — all powered by Clerk's secure, flexible
                            identity infrastructure.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-[#050505] py-32 px-4 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2" />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
                        Common questions
                    </h2>
                    <p className="text-zinc-500 text-lg">Everything you need to know about DashFlow.</p>
                </div>
                
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                >
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 bg-zinc-900/30 rounded-3xl px-6 py-2 transition-all hover:bg-zinc-900/50 hover:border-white/10">
                            <AccordionTrigger className="text-left text-lg font-bold text-white hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-400 text-base leading-relaxed pt-2">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        <section className="relative py-40 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[200px]" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-600/20 to-transparent rounded-full blur-[120px]" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-black tracking-center tracking-tighter mb-8 text-white">
                    Ready to build <br /><span className="text-blue-500 italic">the future?</span>
                </h2>
                <SignInButton forceRedirectUrl="/onboarding">
                    <button className="glow-button bg-white text-black font-black px-12 py-5 rounded-2xl text-xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 active:scale-95">
                        Get Started for Free
                    </button>
                </SignInButton>
            </div>
        </section>
        <footer className="w-full border-t border-zinc-800 bg-[#0b0b0e] py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/DashFlow_logo.png"
                            alt="DashFlow Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-12 w-32 md:h-16 md:w-56 object-contain"
                            priority
                        />
                    </div>
                    <div className="flex gap-4 mt-2 text-zinc-400">
                        <div className="flex gap-4">
                            <Link
                                href="https://www.linkedin.com/in/prabhmeet-singh-742189319"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="hover:text-white transition"
                            >
                                <FaLinkedin size={24} />
                            </Link>

                            <Link
                                href="https://github.com/UG-Prabhmeet/DashFlow"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="hover:text-white transition"
                            >
                                <FaGithub size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-zinc-400 text-sm text-center md:text-right mt-6 md:mt-0">
                    © {new Date().getFullYear()} DashFlow — All rights reserved.
                </div>
            </div>
        </footer>
    </>
);

export default Hero;
