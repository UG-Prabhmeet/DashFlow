import { getProjectReport } from "@/actions/reports";
import BurndownChart from "./_components/burndown-chart";
import ExportButtons from "./_components/export-buttons";
import IssueBreakdown from "./_components/issue-breakdown";
import LeadTimeStats from "./_components/lead-time";
import ProjectProgress from "./_components/project-progress";
import SprintSummary from "./_components/sprint-summary";
import ProjectTimeline from "./_components/ProjectTimeline";
import { VelocityChart } from "./_components/VelocityChart";

export default async function ProjectReportPage({ params }) {
    const { projectId } = await params;
    const project = await getProjectReport(projectId);

    return (
        <div className="pb-10 min-h-screen text-white space-y-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-5xl gradient-title tracking-tight">
                        Project Report:{" "}
                        <span className="text-green-400">{project.name}</span>
                    </h1>
                </div>
                <ExportButtons
                    issues={project.issues}
                    sprints={project.sprints}
                    projectName={project.name}
                />
            </div>

            <ProjectTimeline
                start={new Date(project.projectStartDate)}
                lastActivity={new Date(project.projectLastActivity)}
            />

            <div className="space-y-10">
                <div className="grid lg:grid-cols-2 gap-8">
                    <IssueBreakdown issues={project.issues} />
                    <SprintSummary sprints={project.sprints} />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <BurndownChart sprints={project.sprints} />
                    <ProjectProgress issues={project.issues} />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <LeadTimeStats issues={project.issues} />
                    <VelocityChart sprints={project.sprints} />
                </div>
            </div>
        </div>
    );
}
