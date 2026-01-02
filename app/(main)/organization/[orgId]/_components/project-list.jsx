// components/ProjectList.jsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProjects } from "@/actions/organizations";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
    const projects = await getProjects(orgId);

    if (projects.length === 0) {
        return (
            <p>
                No projects found.{" "}
                <Link
                    className="underline underline-offset-2 text-blue-200"
                    href="/project/create"
                >
                    Create New.
                </Link>
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg bg-[#E0E0E0] transition-all duration-300 border-border/40 overflow-hidden group">
                    <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
                        <CardTitle className="text-xl font-bold tracking-tight">
                            {project.name}
                        </CardTitle>
                        <DeleteProject projectId={project.id} />
                    </CardHeader>
                    <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[2.5rem]">
                            {project.description || "No description provided."}
                        </p>
                        <Link
                            href={`/project/${project.id}`}
                            className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                        >
                            View Project
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
