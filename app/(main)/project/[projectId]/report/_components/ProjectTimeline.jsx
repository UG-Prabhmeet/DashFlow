import { CalendarDays } from "lucide-react";

export default function ProjectTimeline({ start, lastActivity }) {
    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-3 rounded-2xl">
                    <CalendarDays className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Project Timeline</h2>
                    <p className="text-sm text-zinc-500 font-medium">Tracking since inception</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-8">
                <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Created</p>
                    <p className="text-lg font-semibold text-white">{start.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Last Activity</p>
                    <p className="text-lg font-semibold text-white">{lastActivity.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
}
