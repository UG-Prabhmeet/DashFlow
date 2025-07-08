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
    const data = sprints
        .filter((s) => s.status !== "PLANNED")
        .map((s) => ({
            name: s.name,
            closed: s.issues.filter((i) => i.status === "DONE").length,
        }));

    if (data.length === 0) return null;

    return (
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2">
                Sprint Velocity
            </h2>
            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis allowDecimals={false} stroke="#aaa" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#222",
                                borderColor: "#444",
                                color: "#fff",
                            }}
                        />
                        <Bar
                            dataKey="closed"
                            fill="#34d399"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
