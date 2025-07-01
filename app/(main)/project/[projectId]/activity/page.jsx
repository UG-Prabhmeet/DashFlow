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
        <div className="min-h-screen px-6 py-10 bg-black text-white space-y-8">
            <div className="flex items-center gap-3">
                <ActivitySquare className="w-6 h-6 text-sky-400" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Activity Log
                </h1>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-6">
                <ActivityFilters activity={activity} members={members} />
            </div>
        </div>
    );
}
