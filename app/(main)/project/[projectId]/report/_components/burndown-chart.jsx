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

    // Analytics: Generate data points for each day of the sprint
    const data = Array.from({ length: sprintDays + 1 }, (_, day) => {
        const date = new Date(activeSprint.startDate);
        date.setDate(date.getDate() + day);

        // Find how many issues were marked 'DONE' up to this specific day
        const closedTillDate = closedIssues.filter(
            (i) => new Date(i.updatedAt) <= date
        ).length;

        return {
            day: date.toLocaleDateString("en-GB"),
            // Remaining issues = Total - Cumulative closed
            remaining: totalIssues - closedTillDate,
        };
    });

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <TrendingDown className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold tracking-tight">
                    Burndown Chart
                </h2>
            </div>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis
                            dataKey="day"
                            stroke="#52525b"
                            tick={{ fill: "#a1a1aa", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            stroke="#52525b"
                            tick={{ fill: "#a1a1aa", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                color: "#fff",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="remaining"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#a855f7", strokeWidth: 2, stroke: "#18181b" }}
                            activeDot={{ r: 8, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
