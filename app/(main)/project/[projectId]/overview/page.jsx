import { getProject } from "@/actions/projects";
import { getOrganizationUsers } from "@/actions/organizations";
import { getRecentProjectActivity } from "@/actions/activity"; // You should create this function
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
        (i) => i.status === "COMPLETED"
    ).length;
    const totalIssues = project.issues.length;
    const progressPercent = totalIssues
        ? Math.round((completedIssues / totalIssues) * 100)
        : 0;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        {project.name} ({project.key})
                    </h1>
                    <p className="text-gray-300">
                        {project.description || "No description provided."}
                    </p>
                    <p className="text-gray-400 text-sm">
                        Created on:{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" asChild>
                        <Link href={`/project/${projectId}/board`}>Board</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/project/${projectId}/reports`}>
                            Reports
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/project/${projectId}/calendar`}>
                            Calendar
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/project/${projectId}/settings`}>
                            Settings
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg shadow">
                    <h2 className="font-semibold">Total Issues</h2>
                    <p className="text-2xl">{totalIssues}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg shadow">
                    <h2 className="font-semibold">Total Sprints</h2>
                    <p className="text-2xl">{project.sprints.length}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg shadow">
                    <h2 className="font-semibold">Sprint Status</h2>
                    <p>
                        {
                            project.sprints.filter(
                                (s) => s.status === "PLANNED"
                            ).length
                        }{" "}
                        Planned |{" "}
                        {
                            project.sprints.filter((s) => s.status === "ACTIVE")
                                .length
                        }{" "}
                        Active |{" "}
                        {
                            project.sprints.filter(
                                (s) => s.status === "COMPLETED"
                            ).length
                        }{" "}
                        Completed
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="p-4 bg-gray-800 rounded-lg shadow">
                <h2 className="font-semibold mb-2">Project Progress</h2>
                <div className="w-full bg-gray-600 h-4 rounded">
                    <div
                        className="h-4 bg-green-500 rounded"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <p className="text-sm mt-1">{progressPercent}% Completed</p>
            </div>

            {/* Active Sprint */}
            <div className="p-4 bg-gray-800 rounded-lg shadow">
                <h2 className="font-semibold mb-2">Active Sprint</h2>
                {activeSprint ? (
                    <p>{activeSprint.name}</p>
                ) : (
                    <p className="text-gray-400">No active sprint</p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Project Members</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    {members.map((member) => {
                        const fullName = member.name?.trim() || "";
                        const nameParts = fullName.split(" ").filter(Boolean);
                        const firstName = nameParts[0] || "";
                        const lastName = nameParts[1] || "";

                        const displayName = firstName
                            ? lastName
                                ? `${firstName} ${lastName}`
                                : firstName
                            : member.email;

                        return (
                            <div
                                key={member.id}
                                className="flex items-center gap-2"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={member.imageUrl}
                                        className="rounded-full ring h-8 w-8 object-cover"
                                    />
                                    <AvatarFallback className="h-8 w-8 text-xs flex items-center justify-center">
                                        {firstName.charAt(0) || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{displayName}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                <div className="space-y-2 text-sm">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity) => {
                            const userName =
                                activity.user?.name ||
                                activity.user?.email ||
                                "Someone";

                            return (
                                <div
                                    key={activity.id}
                                    className="p-2 bg-gray-700 rounded"
                                >
                                    <p>
                                        <span className="font-semibold">
                                            {userName}
                                        </span>{" "}
                                        {activity.description}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {new Date(
                                            activity.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-400">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
