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
        <div className="p-6 bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-pink-400" />
                Issue Breakdown
            </h2>{" "}
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
                />
                <BreakdownSection
                    title={
                        <span className="inline-flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4" />
                            By Assignee
                        </span>
                    }
                    data={assigneeCounts}
                />
            </div>
        </div>
    );
}

function BreakdownSection({ title, data, type }) {
    const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));

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
