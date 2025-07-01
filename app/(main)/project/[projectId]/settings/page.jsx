import { getProject } from "@/actions/projects";
import { OrganizationProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export default async function ProjectSettingsPage({ params }) {
    const { projectId } = await params;
    const project = await getProject(projectId);

    return (
        <div className="min-h-screen px-6 py-10 bg-black text-white space-y-8">
            <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-amber-400" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Project Settings
                </h1>
            </div>
            <div className="flex justify-center bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-6">
                <OrganizationProfile
                    routing="hash"
                    organizationId={project?.organizationId}
                />
            </div>
        </div>
    );
}
