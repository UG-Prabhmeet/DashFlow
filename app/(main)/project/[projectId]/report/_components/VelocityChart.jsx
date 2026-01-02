"use client";

import { BarChart4 } from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function VelocityChart({ sprints }) {
    // Analytics: Transform sprint data for the BarChart
    // We only show velocity for sprints that are ACTIVE or COMPLETED
    const data = sprints
        .filter((s) => s.status !== "PLANNED")
        .map((s) => ({
            name: s.name,
            velocity: s.velocity, // Use velocity from enriched data
        }));

    if (data.length === 0) return null;

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <BarChart4 className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold tracking-tight">
                    Sprint Velocity
                </h2>
            </div>
            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
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
                            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                            contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                color: "#fff",
                            }}
                            itemStyle={{ color: "#4ade80" }}
                            formatter={(value) => [`${value} issues/day`, "Velocity"]}
                        />
                        <Bar
                            dataKey="velocity"
                            fill="url(#colorClosed)"
                            radius={[6, 6, 0, 0]}
                            barSize={40}
                        />
                        <defs>
                            <linearGradient
                                id="colorClosed"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#4ade80"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#4ade80"
                                    stopOpacity={0.2}
                                />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
