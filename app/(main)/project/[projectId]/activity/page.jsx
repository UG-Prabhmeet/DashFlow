import { getProject } from "@/actions/projects";
import { getRecentProjectActivity } from "@/actions/activity";
import { getOrganizationUsers } from "@/actions/organizations";
import { notFound } from "next/navigation";
import ActivityFilters from "./_components/ActivityFilters";
import { ActivitySquare } from "lucide-react";

export default async function ActivityLogPage({ params }) {
    const { projectId } = await params;
    const project = await getProject(projectId);

    if (!project) notFound();

    const activity = await getRecentProjectActivity(projectId);
    const members = await getOrganizationUsers(project.organizationId);

    return (
        <div className="min-h-screen pb-10 space-y-8">
            <h1 className="text-5xl gradient-title tracking-tight">
                Activity Log
            </h1>

            <div className="bg-muted-foreground rounded-2xl shadow-lg p-6">
                <ActivityFilters activity={activity} members={members} />
            </div>
        </div>
    );
}
