import { getProject } from "@/actions/projects";
import { getOrganizationUsers } from "@/actions/organizations";
import { getRecentProjectActivity } from "@/actions/activity";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, BarChart, Settings, ListTodo, Layers } from "lucide-react";

export default async function ProjectOverview({ params }) {
    const { projectId } = await params;

    let project, members, recentActivity;

    try {
        project = await getProject(projectId);
        if (!project) {
            return (
                <p className="text-red-500">
                    Project not found or unauthorized.
                </p>
            );
        }

        const { orgId } = await auth();
        members = await getOrganizationUsers(orgId);
        recentActivity = await getRecentProjectActivity(projectId);
    } catch (error) {
        console.error(error);
        return redirect("/");
    }

    const activeSprint = project.sprints.find((s) => s.status === "ACTIVE");

    const completedIssues = project.issues.filter(
        (i) => i.status === "DONE"
    ).length;
    const totalIssues = project.issues.length;
    const progressPercent = totalIssues
        ? Math.round((completedIssues / totalIssues) * 100)
        : 0;

    return (
        <div className="mx-auto max-w-7xl animate-in fade-in duration-500 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-4">
                <div>
                    <h1 className="text-4xl font-extrabold gradient-title">
                        {project.name}
                        <span className="text-muted-foreground"> | </span>
                        <Badge variant="secondary" className="px-2 py-0 text-4xl uppercase tracking-wider">
                            {project.key}
                        </Badge>
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        {project.description || "Streamline your team's workflow and track progress effectively."}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Created on {new Date(project.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 bg-secondary/30 p-2 rounded-xl border border-border/50">
                    <Button variant="ghost" size="sm" asChild className="hover:bg-background shadow-none">
                        <Link href={`/project/${projectId}/board`} className="flex items-center text-white gap-2">
                            Board
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-background shadow-none">
                        <Link href={`/project/${projectId}/reports`} className="flex items-center text-white gap-2">
                            Reports
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-background shadow-none">
                        <Link href={`/project/${projectId}/activity`} className="flex items-center text-white gap-2">
                           Activity
                        </Link>
                    </Button>
                    <Separator orientation="vertical" className="h-8 hidden md:block" />
                    <Button variant="ghost" size="sm" asChild className="hover:bg-background shadow-none">
                        <Link href={`/project/${projectId}/settings`} className="flex items-center text-white gap-2">
                            Settings
                        </Link>
                    </Button>
                </div>
            </div>

            <Separator className="mb-8" />

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <Card className="bg-white border-muted-foreground/20 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                            Total Issues
                            <ListTodo className="w-4 h-4 opacity-50" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{totalIssues}</div>
                        <p className="text-[11px] text-muted-foreground mt-2 font-medium">All tasks in current scope</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-muted-foreground/20 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                            Sprints
                            <Layers className="w-4 h-4 opacity-50" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{project.sprints.length}</div>
                        <div className="mt-3 flex gap-2">
                            <Badge variant="outline" className="text-[10px] bg-blue-500/5 text-blue-500 border-blue-500/20 px-2">
                                {project.sprints.filter(s => s.status === "ACTIVE").length} Active
                            </Badge>
                            <Badge variant="outline" className="text-[10px] bg-slate-500/5 text-slate-500 border-slate-500/20 px-2">
                                {project.sprints.filter(s => s.status === "PLANNED").length} Planned
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-muted-foreground/20 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                            Project Progress
                            <BarChart className="w-4 h-4 opacity-50" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{progressPercent}%</div>
                        <div className="mt-4 w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden border border-border/50">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-3 font-medium">
                           {completedIssues} of {totalIssues} completed
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Activity and Members */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Sprint Section */}
                    <Card className="border-border/60">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" /> Active Sprint
                            </CardTitle>
                            {activeSprint && <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-200">In Progress</Badge>}
                        </CardHeader>
                        <CardContent className="pt-6">
                            {activeSprint ? (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-xl">{activeSprint.name}</h3>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            Ending {new Date(activeSprint.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Button asChild size="sm">
                                        <Link href={`/project/${projectId}/board`}>View Board</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground">
                                    <p>No currently active sprint</p>
                                    <Button variant="link" asChild className="mt-2">
                                        <Link href={`/project/${projectId}/board`}>Start a new sprint</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Activity Section */}
                    <Card className="border-border/60">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" /> Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {recentActivity.length > 0 ? (
                                <div className="divide-y divide-border/50">
                                    {recentActivity.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="px-6 py-4 hover:bg-muted/50 transition-colors flex items-start gap-4"
                                        >
                                            <Avatar className="h-9 w-9 shrink-0 border">
                                                <AvatarImage src={activity.user?.imageUrl} />
                                                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                                    {(activity.user?.name || "S").charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm leading-snug">
                                                    <span className="font-semibold text-foreground">
                                                        {activity.user?.name || activity.user?.email || "Someone"}
                                                    </span>{" "}
                                                    <span className="text-muted-foreground">{activity.description}</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(activity.createdAt).toLocaleString(undefined, {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    No activity recorded yet for this project.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Project Members */}
                <div className="space-y-6">
                    <Card className="border-border/60">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-500" /> Project Members
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {members.map((member) => {
                                    const fullName = member.name?.trim() || member.email;
                                    return (
                                        <div
                                            key={member.id}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="relative">
                                                <Avatar className="h-10 w-10 border transition-transform group-hover:scale-105">
                                                    <AvatarImage src={member.imageUrl} className="object-cover" />
                                                    <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                                                        {fullName.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold truncate text-foreground group-hover:text-blue-500 transition-colors">
                                                    {fullName}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate italic">
                                                    {member.role || "Member"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
