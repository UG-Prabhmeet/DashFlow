"use client";
import { Flag } from "lucide-react";
import { useState } from "react";

export default function SprintSummary({ sprints }) {
    const [filter, setFilter] = useState("ALL");

    const filtered =
        filter === "ALL" ? sprints : sprints.filter((s) => s.status === filter);

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <Flag className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold tracking-tight">
                        Sprint Summary
                    </h2>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-zinc-800 border border-zinc-600 text-sm px-2 py-1 rounded-md"
                >
                    <option value="ALL">All</option>
                    <option value="PLANNED">Planned</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>

            <ul className="space-y-3">
                {filtered.map((sprint) => {
                    const closed = sprint.issues.filter(
                        (i) => i.status === "DONE"
                    ).length;
                    const total = sprint.issues.length;
                    const percent = total
                        ? Math.round((closed / total) * 100)
                        : 0;
                    const velocity = total
                        ? Math.round(
                              closed /
                                  ((new Date(sprint.endDate) -
                                      new Date(sprint.startDate)) /
                                      86400000)
                          )
                        : 0;

                    const now = new Date();
                    const overdue =
                        sprint.status !== "COMPLETED" &&
                        new Date(sprint.endDate) < now;

                    return (
                        <li
                            key={sprint.id}
                            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 space-y-2 hover:bg-zinc-700/50 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-lg font-semibold flex items-center gap-2">
                                        {sprint.name}
                                        {overdue && (
                                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                                Overdue
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-zinc-400">
                                        <StatusBadge status={sprint.status} /> •{" "}
                                        {formatDate(sprint.startDate)} →{" "}
                                        {formatDate(sprint.endDate)} • Velocity:{" "}
                                        {velocity}/day
                                    </div>
                                </div>
                                <div className="text-sm text-zinc-200 font-medium">
                                    {closed}/{total} Closed
                                </div>
                            </div>
                            <div className="w-full bg-zinc-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-full transition-all duration-500 ease-out"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function StatusBadge({ status }) {
    const statusStyles = {
        PLANNED: "bg-blue-600 text-white",
        ACTIVE: "bg-green-600 text-white",
        COMPLETED: "bg-purple-600 text-white",
        CANCELLED: "bg-red-500 text-white",
    };

    return (
        <span
            className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                statusStyles[status] || "bg-zinc-600 text-white"
            }`}
        >
            {status}
        </span>
    );
}

function formatDate(d) {
    return new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
