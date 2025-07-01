import { getProject } from "@/actions/projects";
import { getRecentProjectActivity } from "@/actions/activity";
import { getOrganizationUsers } from "@/actions/organizations";
import { notFound } from "next/navigation";
import ActivityFilters from "./_components/ActivityFilters";

export default async function ActivityLogPage({ params }) {
    const { projectId } = await params;
    const project = await getProject(projectId);

    if (!project) notFound();

    const activity = await getRecentProjectActivity(projectId);
    const members = await getOrganizationUsers(project.organizationId);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <ActivityFilters activity={activity} members={members} />
        </div>
    );
}
