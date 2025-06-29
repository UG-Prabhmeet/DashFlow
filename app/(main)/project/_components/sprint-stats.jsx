"use client";
import React from "react";
import CountUp from "react-countup";

export default function SprintStats({ issues }) {
    const total = issues.length;

    const countByStatus = issues.reduce(
        (acc, issue) => {
            acc[issue.status] = (acc[issue.status] || 0) + 1;
            return acc;
        },
        { Todo: 0, "In Progress": 0, "In Review": 0, Done: 0 }
    );

    const Stat = ({ label, count, icon }) => (
        <span className="flex items-center gap-1">
            {icon}
            <CountUp end={count} duration={0.8} />
            {label}
        </span>
    );

    return (
        <div className="my-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex flex-wrap gap-6 justify-start text-white text-sm font-semibold">
            <Stat icon="📊" count={total} label=" Total Issues" />
            <Stat icon="📝" count={countByStatus.Todo} label=" Todo" />
            <Stat
                icon="🚧"
                count={countByStatus["In Progress"]}
                label=" In Progress"
            />
            <Stat
                icon="🧪"
                count={countByStatus["In Review"]}
                label=" In Review"
            />
            <Stat icon="✅" count={countByStatus.Done} label=" Done" />
        </div>
    );
}
