import { Rocket } from "lucide-react";

export default function ProjectProgress({ issues }) {
    const total = issues.length;
    const done = issues.filter((i) => i.status === "DONE").length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    return (
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-green-400" />
                Project Progress
            </h2>
            <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
                <div
                    className="bg-green-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="text-sm text-zinc-400 mt-2">
                {percent}% Completed ({done} of {total} issues)
            </p>
        </div>
    );
}
