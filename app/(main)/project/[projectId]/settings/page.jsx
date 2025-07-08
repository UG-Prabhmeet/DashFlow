import { getProject } from "@/actions/projects";
import { OrganizationProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export default async function ProjectSettingsPage({ params }) {
    const { projectId } = await params;
    const project = await getProject(projectId);

    return (
        <div className="min-h-screen pb-10 space-y-8">
            <h1 className="text-5xl gradient-title tracking-tight">
                Project Settings
            </h1>

            <div className="flex justify-center p-6">
                <OrganizationProfile
                    routing="hash"
                    organizationId={project?.organizationId}
                />
            </div>
        </div>
    );
}
