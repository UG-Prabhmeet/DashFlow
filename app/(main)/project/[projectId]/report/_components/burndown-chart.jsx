"use client";
import { TrendingDown } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function BurndownChart({ sprints }) {
    const activeSprint = sprints.find((s) => s.status === "ACTIVE");
    if (!activeSprint) return null;

    const totalIssues = activeSprint.issues.length;
    const closedIssues = activeSprint.issues.filter((i) => i.status === "DONE");

    const sprintDays = Math.ceil(
        (new Date(activeSprint.endDate) - new Date(activeSprint.startDate)) /
            (1000 * 60 * 60 * 24)
    );

    const data = Array.from({ length: sprintDays + 1 }, (_, day) => {
        const date = new Date(activeSprint.startDate);
        date.setDate(date.getDate() + day);

        const closedTillDate = closedIssues.filter(
            (i) => new Date(i.updatedAt) <= date
        ).length;

        return {
            day: date.toLocaleDateString("en-GB"),
            remaining: totalIssues - closedTillDate,
        };
    });

    return (
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-purple-400" />
                Burndown Chart
            </h2>
            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid stroke="#555" strokeDasharray="3 3" />
                        <XAxis dataKey="day" stroke="#aaa" />
                        <YAxis allowDecimals={false} stroke="#aaa" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#222",
                                borderColor: "#444",
                                color: "#fff",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="remaining"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
