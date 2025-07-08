import { Timer } from "lucide-react";

export default function LeadTimeStats({ issues }) {
    const completed = issues.filter(
        (i) => i.status === "DONE" && i.createdAt && i.updatedAt
    );
    const leadTimes = completed.map(
        (i) =>
            (new Date(i.updatedAt) - new Date(i.createdAt)) /
            (1000 * 60 * 60 * 24)
    );

    const avg = leadTimes.length
        ? (leadTimes.reduce((a, b) => a + b) / leadTimes.length).toFixed(1)
        : 0;
    const min = leadTimes.length ? Math.min(...leadTimes).toFixed(1) : 0;
    const max = leadTimes.length ? Math.max(...leadTimes).toFixed(1) : 0;
    const sorted = [...leadTimes].sort((a, b) => a - b);
    const median = leadTimes.length
        ? (sorted.length % 2 === 0
              ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
              : sorted[Math.floor(sorted.length / 2)]
          ).toFixed(1)
        : 0;

    return (
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2">
                Lead Time Stats
            </h2>
            <ul className="text-sm text-zinc-300 space-y-1">
                <li>
                    Average:{" "}
                    <span className="text-white font-medium">{avg}</span> days
                </li>
                <li>
                    Median:{" "}
                    <span className="text-white font-medium">{median}</span>{" "}
                    days
                </li>
                <li>
                    Min: <span className="text-white font-medium">{min}</span>{" "}
                    days
                </li>
                <li>
                    Max: <span className="text-white font-medium">{max}</span>{" "}
                    days
                </li>
            </ul>
        </div>
    );
}
