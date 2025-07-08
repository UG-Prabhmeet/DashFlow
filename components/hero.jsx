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

const Hero = () => (
    <>
        {/* HERO SECTION */}
        <section
            className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center px-4"
            style={{ backgroundImage: "url('/hero_background.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 z-0" />
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
                    <button className="bg-white text-black font-medium px-6 py-2 rounded-full shadow hover:bg-zinc-100 transition">
                        View on GitHub
                    </button>
                    <button className="bg-transparent border-none text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 hover:underline transition">
                        Launch Project <span className="text-xl">→</span>
                    </button>
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

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                        Intuitive Project Planning
                    </h3>
                    <p className="text-zinc-300 text-lg">
                        With DashFlow, you eliminate the chaos of spreadsheets,
                        scattered tasks, and unclear priorities. Plan your
                        sprints, assign issues, and visualize team load from one
                        sleek interface — with role-based access and real-time
                        updates.
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden w-full max-w-xl shadow-lg">
                    <img
                        src="/path/to/6429d45c-689d-4ae8-bd4f-dd827f579e8c.png"
                        alt="DashFlow pipeline diagram"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            <section className="bg-black text-white py-24 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-24">
                    {/* Left: Image */}
                    <div className="flex-1 flex justify-center">
                        <div className="rounded-2xl overflow-hidden w-full max-w-xl shadow-lg">
                            <img
                                src="/images/automated-insights.png"
                                alt="DashFlow automated insights"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                            Automated Progress & Insights
                        </h3>
                        <p className="text-zinc-300 text-lg">
                            DashFlow lets you focus on work, not admin. With
                            real-time dashboards, sprint analytics, and
                            automated reporting, you always know how your team
                            is progressing — without lifting a finger.
                        </p>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                            Intuitive Project Planning
                        </h3>
                        <p className="text-zinc-300 text-lg mb-4">
                            With DashFlow, eliminate the chaos of scattered
                            tools and spreadsheets. Plan sprints, assign issues,
                            and manage priorities in one sleek interface with
                            role-based access and real-time sync.
                        </p>
                        <ul className="text-zinc-400 list-disc pl-5 space-y-1 text-base">
                            <li>Create and assign tasks with ease</li>
                            <li>Drag-and-drop Kanban board</li>
                            <li>Sprint creation and timeline tracking</li>
                            <li>Permissions for admins and members</li>
                            <li>
                                Burndown charts, lead time & velocity insights
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl overflow-hidden w-full max-w-xl shadow-lg">
                        <img
                            src="/images/project-planning.png"
                            alt="Project planning diagram"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>
        </section>

        <section className="bg-black text-white py-24 px-4">
            <h2 className="text-4xl md:text-5xl gradient-title text-center mb-16 text-zinc-100">
                Learn More About Building Better Teams
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <img
                        src="/images/blog/agile-planning.jpg"
                        alt="Agile Planning"
                        className="w-full h-48 object-cover bg-zinc-800"
                    />
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            PRODUCTIVITY
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            How to Plan Sprints That Actually Deliver
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Learn how structured sprint planning leads to
                            focused teams and faster shipping cycles.
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <img
                        src="/images/blog/analytics-insights.jpg"
                        alt="Analytics & Insights"
                        className="w-full h-48 object-cover bg-zinc-800"
                    />
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            INSIGHTS
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            What Project Analytics Reveal About Team Health
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Uncover the metrics that matter: velocity, lead
                            time, and team efficiency — all from your DashFlow
                            reports.
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                    <img
                        src="/images/blog/kanban-vs-sprint.jpg"
                        alt="Kanban vs Sprint"
                        className="w-full h-48 object-cover bg-zinc-800"
                    />
                    <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block bg-zinc-800 text-xs px-3 py-1 rounded-full mb-4 tracking-widest text-zinc-200">
                            WORKFLOWS
                        </span>
                        <h3 className="text-lg font-semibold mb-1">
                            Kanban or Sprints? Choosing the Right Flow for Your
                            Team
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Compare Kanban and Sprint workflows with real-world
                            examples to help you choose what fits best.
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
                        <span className="text-xl font-semibold text-white">
                            DashFlow
                        </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-zinc-400">
                        <a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-white transition"
                        >
                            <FaLinkedin size={24} />
                        </a>

                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="hover:text-white transition"
                        >
                            <FaGithub size={24} />
                        </a>
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
