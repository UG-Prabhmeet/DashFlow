import { CalendarDays } from "lucide-react";

export default function ProjectTimeline({ start, lastActivity }) {
    return (
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                Timeline
            </h2>
            <p className="text-sm text-zinc-300">
                Project started on:{" "}
                <span className="text-white font-medium">
                    {start.toLocaleDateString()}
                </span>
            </p>
            <p className="text-sm text-zinc-300">
                Last activity on:{" "}
                <span className="text-white font-medium">
                    {lastActivity.toLocaleDateString()}
                </span>
            </p>
        </div>
    );
}
