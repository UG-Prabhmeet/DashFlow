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
            className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center px-4"
            style={{ backgroundImage: "url('/hero_background.jpg')" }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0" />

            <div className="relative z-10 mx-auto">
                <div className="mb-4">
                    <span className="inline-block bg-zinc-900 text-xs px-4 py-1 rounded-full border border-zinc-700 tracking-widest mb-6">
                        BUILT FOR TEAMS
                    </span>
                </div>
                <h2 className="text-5xl md:text-6xl gradient-title mb-2">
                    Streamline Agile Projects with DashFlow
                </h2>
                <p className="text-zinc-400 mt-4 mb-8 text-lg max-w-xl mx-auto">
                    Real-time collaboration. Visual progress. Powerful reports
                </p>
                <div className="flex justify-center gap-4 mb-16">
                    <SignInButton forceRedirectUrl="/onboarding">
                        <button className="bg-black text-white font-medium px-6 py-2 rounded-full shadow hover:bg-zinc-100 transition">
                            Get Started
                        </button>
                    </SignInButton>
                    <Link
                        href="https://github.com/UG-Prabhmeet/DashFlow"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-white text-black font-medium px-6 py-2 rounded-full shadow hover:bg-zinc-100 transition">
                            View on GitHub
                        </button>
                    </Link>
                </div>
            </div>
        </section>
        <section className="w-full flex flex-col md:flex-row items-stretch justify-center py-24 px-4 pl-3 md:pl-30 bg-[#0b0b0e]">
            {/* Left: Main Text */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto md:mx-0 pl-12">
                <h2 className="text-3xl md:text-5xl gradient-title text-white mb-6 leading-tight">
                    We streamline
                    <br />
                    your workflow.
                    <br />
                    So your team can
                    <br />
                    focus on building.
                </h2>
                <p className="text-zinc-400 text-lg mb-8">
                    DashFlow makes project planning, task tracking, and team
                    collaboration seamless—out of the box.
                </p>
                <button className="flex items-center gap-2 text-blue-400 font-semibold hover:underline text-lg w-fit">
                    Explore DashFlow <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 hidden md:flex flex-col justify-center pl-16">
                <ul className="space-y-2 text-2xl font-medium select-none">
                    <li className="text-zinc-100">Sprint planning</li>
                    <li className="text-zinc-100">Real-time sync</li>
                    <li className="text-zinc-100">Custom workflows</li>
                    <li className="text-zinc-300">Drag & drop tasks</li>
                    <li className="text-zinc-300">Role-based access</li>
                    <li className="text-zinc-300">Task dependencies</li>
                    <li className="text-zinc-400">Timeline view</li>
                    <li className="text-zinc-400">Issue tracking</li>
                    <li className="text-zinc-400">Team chat</li>
                    <li className="text-zinc-400">Comments & mentions</li>
                    <li className="text-zinc-400">Notifications</li>
                    <li className="text-zinc-400">Kanban & Gantt</li>
                    <li className="text-zinc-100">Analytics & reporting</li>
                </ul>
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
        <section className="bg-gradient-to-b from-black via-zinc-900/80 to-black py-24 px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-4xl md:text-5xl gradient-title mb-4 text-zinc-100">
                    Frequently asked
                    <br />
                    questions
                </h2>
            </div>
            <div className="max-w-2xl mx-auto">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                >
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-base text-zinc-100">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-400">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4 relative overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(135deg, rgba(255,140,0,0.08) 0%, transparent 70%)",
                    backgroundSize: "32px 32px",
                    pointerEvents: "none",
                }}
            />
            <h1 className="text-4xl md:text-6xl gradient-title mb-4 text-zinc-100 z-10">
                Run Sprints. Track Issues. Deliver Faster.
            </h1>
            <p className="text-zinc-400 text-lg mb-8 z-10">
                DashFlow helps teams plan, build, and ship better – with
                real-time sync, kanban boards, and powerful reporting.
            </p>
            <div className="z-10">
                <button className="bg-white text-black font-medium px-6 py-2 rounded-full shadow hover:bg-zinc-100 transition">
                    Explore DashFlow
                </button>
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
                    © 2025 DashFlow — All rights reserved.
                </div>
            </div>
        </footer>
    </>
);

export default Hero;
