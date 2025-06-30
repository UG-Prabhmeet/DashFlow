"use client";

import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "@/hooks/use-fetch";
import { createIssue } from "@/actions/issues";
import { getOrganizationUsers } from "@/actions/organizations";
import { issueSchema } from "@/app/lib/validators";

export default function IssueCreationDrawer({
    isOpen,
    onClose,
    sprintId,
    status,
    projectId,
    onIssueCreated,
    orgId,
}) {
    const {
        loading: createIssueLoading,
        fn: createIssueFn,
        error,
        data: newIssue,
    } = useFetch(createIssue);

    const {
        loading: usersLoading,
        fn: fetchUsers,
        data: users,
    } = useFetch(getOrganizationUsers);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            priority: "MEDIUM",
            description: "",
            assigneeId: "",
            dueDate: "", // ← Added default value
            tags: "", // ← Added default value
        },
    });

    useEffect(() => {
        if (isOpen && orgId) {
            fetchUsers(orgId);
        }
    }, [isOpen, orgId]);

    const onSubmit = async (data) => {
        await createIssueFn(projectId, {
            ...data,
            status,
            sprintId,
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        });
    };

    useEffect(() => {
        if (newIssue) {
            reset();
            onClose();
            onIssueCreated();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newIssue, createIssueLoading]);

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Issue</DrawerTitle>
                </DrawerHeader>
                {usersLoading && <BarLoader width={"100%"} color="#36d7b7" />}
                <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-1"
                            >
                                Title
                            </label>
                            <Input id="title" {...register("title")} />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-1"
                            >
                                Description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <MDEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        {/* Assignee + Priority + Due Date Row */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                            {/* Assignee */}
                            <div className="flex-1">
                                <label
                                    htmlFor="assigneeId"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Assignee
                                </label>
                                <Controller
                                    name="assigneeId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assignee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users?.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user?.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.assigneeId && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.assigneeId.message}
                                    </p>
                                )}
                            </div>

                            {/* Priority */}
                            <div className="flex-1">
                                <label
                                    htmlFor="priority"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Priority
                                </label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LOW">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="MEDIUM">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="HIGH">
                                                    High
                                                </SelectItem>
                                                <SelectItem value="URGENT">
                                                    Urgent
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Due Date */}
                            <div className="flex-1">
                                <label
                                    htmlFor="dueDate"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Due Date
                                </label>
                                <Input
                                    type="date"
                                    id="dueDate"
                                    {...register("dueDate")}
                                />
                                {errors.dueDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.dueDate.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* --- Tags (new) --- */}
                        <Input
                            id="tags"
                            placeholder="e.g. bug,frontend,urgent"
                            {...register("tags")}
                        />
                        {errors.tags && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tags.message}
                            </p>
                        )}

                        {error && (
                            <p className="text-red-500 mt-2">{error.message}</p>
                        )}
                        <Button
                            type="submit"
                            disabled={createIssueLoading}
                            className="w-full"
                        >
                            {createIssueLoading
                                ? "Creating..."
                                : "Create Issue"}
                        </Button>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
