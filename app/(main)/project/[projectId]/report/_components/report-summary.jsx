import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo, TrendingUp } from "lucide-react";

export default function ReportSummary({ issues, sprints }) {
    const totalIssues = issues.length;
    const completedIssues = issues.filter((i) => i.status === "DONE").length;
    const openIssues = totalIssues - completedIssues;
    const avgVelocity =
        sprints.length > 0
            ? (
                  sprints.reduce((acc, s) => acc + s.velocity, 0) / sprints.length
              ).toFixed(2)
            : 0;

    const stats = [
        {
            title: "Total Issues",
            value: totalIssues,
            icon: ListTodo,
            color: "text-blue-400",
        },
        {
            title: "Completed",
            value: completedIssues,
            icon: CheckCircle2,
            color: "text-green-400",
        },
        {
            title: "Open Issues",
            value: openIssues,
            icon: Circle,
            color: "text-yellow-400",
        },
        {
            title: "Avg. Velocity",
            value: avgVelocity,
            icon: TrendingUp,
            color: "text-purple-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
