import { Rocket } from "lucide-react";

export default function ProjectProgress({ issues }) {
    const total = issues.length;
    const done = issues.filter((i) => i.status === "DONE").length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold tracking-tight">
                    Project Progress
                </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl font-bold text-white">
                        {percent}%
                    </span>
                    <span className="text-sm text-zinc-400 font-medium pb-1">
                        {done} / {total} Issues Completed
                    </span>
                </div>
                <div className="w-full bg-zinc-800/50 rounded-full h-4 overflow-hidden border border-zinc-700/30 shadow-inner">
                    <div
                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
