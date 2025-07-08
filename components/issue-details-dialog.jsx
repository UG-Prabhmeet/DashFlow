"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import UserAvatar from "./user-avatar";
import IssueComments from "./issue-comments";
import { useUser, useOrganization } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getOrganizationUsers } from "@/actions/organizations";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { deleteIssue, updateIssue } from "@/actions/issues";
import useFetch from "@/hooks/use-fetch";
import statuses from "@/data/status";

const priorityOptions = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function IssueDetailsDialog({
    isOpen,
    onClose,
    issue,
    onDelete = () => {},
    onUpdate = () => {},
    borderCol = "",
}) {
    const [status, setStatus] = useState(issue.status);
    const [priority, setPriority] = useState(issue.priority);
    const [assigneeId, setAssigneeId] = useState(issue.assignee?.id || "");
    const { user } = useUser();
    const { membership, organization } = useOrganization();
    const [orgUsers, setOrgUsers] = useState([]);
    const router = useRouter();
    const pathname = usePathname();

    const {
        loading: deleteLoading,
        error: deleteError,
        fn: deleteIssueFn,
        data: deleted,
    } = useFetch(deleteIssue);

    const {
        loading: updateLoading,
        error: updateError,
        fn: updateIssueFn,
        data: updated,
    } = useFetch(updateIssue);

    const canChange =
        user.id === issue.reporter.clerkUserId ||
        membership.role === "org:admin";

    useEffect(() => {
        if (organization?.id && canChange) {
            getOrganizationUsers(organization.id).then(setOrgUsers);
        }
    }, [organization?.id, canChange]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this issue?")) {
            deleteIssueFn(issue.id);
        }
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        updateIssueFn(issue.id, { status: newStatus, priority });
    };

    const handlePriorityChange = (newPriority) => {
        setPriority(newPriority);
        updateIssueFn(issue.id, { status, priority: newPriority });
    };
    const handleAssigneeChange = (newAssigneeId) => {
        setAssigneeId(newAssigneeId);
        updateIssueFn(issue.id, {
            status,
            priority,
            assigneeId: newAssigneeId,
        });
    };

    useEffect(() => {
        if (deleted) {
            onClose();
            onDelete();
        }
        if (updated) {
            onUpdate(updated);
        }
    }, [deleted, updated]);

    const handleGoToProject = () => {
        router.push(`/project/${issue.projectId}?sprint=${issue.sprintId}`);
    };

    const getDisplayName = (user, adminIds = []) => {
        const first = user?.name || user?.firstName || "";
        const last = user?.lastName || "";
        const name =
            `${first} ${last}`.trim() ||
            user?.email?.split("@")[0] ||
            "Unknown";
        const isAdmin = adminIds.includes(user?.id);
        return `${name}${isAdmin ? " (admin)" : ""}`;
    };

    const isProjectPage = !pathname.startsWith("/project/");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#111827] text-white rounded-2xl shadow-2xl border border-gray-700 max-w-2xl px-6 py-4 space-y-4">
                <DialogHeader>
                    <div className="flex justify-between items-start mt-4">
                        <DialogTitle className="text-2xl font-semibold">
                            {issue.title}
                        </DialogTitle>
                        {isProjectPage && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleGoToProject}
                                title="Go to Project"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </DialogHeader>

                {(updateLoading || deleteLoading) && (
                    <BarLoader width={"100%"} color="#36d7b7" />
                )}

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Select
                            value={status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((option) => (
                                    <SelectItem
                                        key={option.key}
                                        value={option.key}
                                    >
                                        {option.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={priority}
                            onValueChange={handlePriorityChange}
                            disabled={!canChange}
                        >
                            <SelectTrigger
                                className={`border ${borderCol} rounded`}
                            >
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {priorityOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <h4 className="font-semibold">Description</h4>
                        <MDEditor.Markdown
                            className="rounded px-2 py-1 mt-3"
                            source={
                                issue.description ||
                                "_No description provided._"
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-semibold mb-1">Assignee</h4>
                            {canChange ? (
                                <Select
                                    value={assigneeId}
                                    onValueChange={handleAssigneeChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Select assignee"
                                            // 👇 Custom render
                                            children={getDisplayName(
                                                orgUsers.find(
                                                    (u) => u.id === assigneeId
                                                ),
                                                issue.project?.adminIds || []
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {orgUsers.map((orgUser) => (
                                            <SelectItem
                                                key={orgUser.id}
                                                value={orgUser.id}
                                            >
                                                {getDisplayName(
                                                    orgUser,
                                                    issue.project?.adminIds ||
                                                        []
                                                )}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <UserAvatar user={issue.assignee} />
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-400 mb-1">
                                Reporter
                            </h4>
                            <div className="flex items-center space-x-2">
                                <UserAvatar user={issue.reporter} />
                            </div>
                        </div>
                    </div>
                    {issue.dueDate && (
                        <div>
                            <h4 className="font-semibold mb-1">Due Date</h4>
                            <p className="text-gray-300">
                                {new Date(issue.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {issue.tags?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {issue.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-700 text-white text-sm px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <IssueComments issueId={issue.id} />

                    {canChange && (
                        <Button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            variant="destructive"
                        >
                            {deleteLoading ? "Deleting..." : "Delete Issue"}
                        </Button>
                    )}

                    {(deleteError || updateError) && (
                        <p className="text-sm text-red-400 mt-2">
                            {deleteError?.message || updateError?.message}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
