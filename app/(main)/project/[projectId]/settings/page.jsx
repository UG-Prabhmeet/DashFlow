import { getProject } from "@/actions/projects";
import { OrganizationProfile } from "@clerk/nextjs";

export default async function ProjectSettingsPage({ params }) {
    const { projectId } = await params;
    const project = await getProject(projectId);

    return (
        <div className="flex justify-center">
            <OrganizationProfile
                routing="hash"
                organizationId={project?.organizationId}
            />
        </div>
    );
}
