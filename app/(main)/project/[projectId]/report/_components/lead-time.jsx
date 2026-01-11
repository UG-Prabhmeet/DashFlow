import { Timer } from "lucide-react";

export default function LeadTimeStats({ issues }) {
    // Analytics: Filter only completed issues to calculate lead time
    const completed = issues.filter(
        (i) => i.status === "DONE" && i.createdAt && i.updatedAt
    );
    // Lead time per issue: Days between creation and completion
    const leadTimes = completed.map(
        (i) =>
            (new Date(i.updatedAt) - new Date(i.createdAt)) /
            (1000 * 60 * 60 * 24)
    );

    // Analytics: Calculate aggregate metrics
    const avg = leadTimes.length
        ? (leadTimes.reduce((a, b) => a + b) / leadTimes.length).toFixed(1)
        : 0;
    const min = leadTimes.length ? Math.min(...leadTimes).toFixed(1) : 0;
    const max = leadTimes.length ? Math.max(...leadTimes).toFixed(1) : 0;
    const sorted = [...leadTimes].sort((a, b) => a - b);
    // Median calculation for better "typical" case insight
    const median = leadTimes.length
        ? (sorted.length % 2 === 0
              ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
              : sorted[Math.floor(sorted.length / 2)]
          ).toFixed(1)
        : 0;

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <Timer className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold tracking-tight">
                    Lead Time Stats
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatCard label="Average" value={avg} unit="days" />
                <StatCard label="Median" value={median} unit="days" />
                <StatCard label="Min" value={min} unit="days" />
                <StatCard label="Max" value={max} unit="days" />
            </div>
        </div>
    );
}

function StatCard({ label, value, unit }) {
    return (
        <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 group hover:border-blue-500/50 transition-colors">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                {label}
            </p>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {value}
                </span>
                <span className="text-xs text-zinc-500 font-medium">{unit}</span>
            </div>
        </div>
    );
}
