import {
    AlertTriangle,
    FolderKanban,
    PieChart,
    Tags,
    UserCircle2,
} from "lucide-react";

export default function IssueBreakdown({ issues }) {
    const statusCounts = {};
    const priorityCounts = {};
    const tagCounts = {};
    const assigneeCounts = {};

    for (const issue of issues) {
        statusCounts[issue.status] = (statusCounts[issue.status] || 0) + 1;
        priorityCounts[issue.priority] =
            (priorityCounts[issue.priority] || 0) + 1;

        for (const tag of issue.tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }

        const assigneeName = issue.assignee?.name || "Unassigned";
        assigneeCounts[assigneeName] = (assigneeCounts[assigneeName] || 0) + 1;
    }

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold tracking-tight">
                    Issue Distribution
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <BreakdownSection
                    title={
                        <span className="inline-flex items-center gap-2">
                            <FolderKanban className="w-4 h-4" />
                            By Status
                        </span>
                    }
                    data={statusCounts}
                    type="status"
                />
                <BreakdownSection
                    title={
                        <span className="inline-flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            By Priority
                        </span>
                    }
                    data={priorityCounts}
                    type="priority"
                />
                <BreakdownSection
                    title={
                        <span className="inline-flex items-center gap-2">
                            <Tags className="w-4 h-4" />
                            By Tags
                        </span>
                    }
                    data={tagCounts}
                    limit={3}
                />
                <BreakdownSection
                    title={
                        <span className="inline-flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4" />
                            By Assignee
                        </span>
                    }
                    data={assigneeCounts}
                    limit={3}
                />
            </div>
        </div>
    );
}

function BreakdownSection({ title, data, type, limit }) {
    const entries = Object.entries(data)
        .sort(([, aCount], [, bCount]) => bCount - aCount) // Sort by count DESC
        .slice(0, limit); // Limit the number of entries shown

    return (
        <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <ul className="space-y-1 text-sm text-zinc-300">
                {entries.map(([key, value]) => (
                    <li
                        key={key}
                        className="flex justify-between items-center gap-4"
                    >
                        <span
                            className={`truncate ${getColorClass(
                                type,
                                key
                            )} max-w-[70%]`}
                            title={key}
                        >
                            {key}
                        </span>
                        <span className="font-medium text-zinc-100">
                            {value}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function getColorClass(type, key) {
    if (type === "status") {
        const map = {
            TODO: "text-yellow-400",
            IN_PROGRESS: "text-blue-400",
            IN_REVIEW: "text-purple-400",
            DONE: "text-green-400",
        };
        return map[key] || "text-white";
    }

    if (type === "priority") {
        const map = {
            LOW: "text-green-400",
            MEDIUM: "text-yellow-400",
            HIGH: "text-orange-400",
            URGENT: "text-red-500",
        };
        return map[key] || "text-white";
    }

    return "text-white";
}
