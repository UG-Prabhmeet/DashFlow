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
import { updateIssue } from "@/actions/issues";
import { getOrganizationUsers } from "@/actions/organizations";
import { issueSchema } from "@/app/lib/validators";

export default function EditIssueDrawer({
    isOpen,
    onClose,
    issue,
    orgId,
    onIssueUpdated,
}) {
    const {
        loading: updateLoading,
        fn: updateIssueFn,
        error,
        data: updatedIssue,
    } = useFetch(updateIssue);

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
            title: issue?.title || "",
            description: issue?.description || "",
            assigneeId: issue?.assignee?.id || "",
            priority: issue?.priority || "MEDIUM",
        },
    });

    useEffect(() => {
        if (isOpen && orgId) {
            fetchUsers(orgId);
        }
        if (issue) {
            reset({
                title: issue.title,
                description: issue.description,
                assigneeId: issue.assignee?.id || "",
                priority: issue.priority,
            });
        }
    }, [isOpen, orgId, issue, reset]);

    const onSubmit = async (data) => {
        await updateIssueFn(issue.id, {
            ...data,
            status: issue.status, // Keep status unchanged via this form
        });
    };

    useEffect(() => {
        if (updatedIssue) {
            reset();
            onClose();
            onIssueUpdated(updatedIssue);
        }
    }, [updatedIssue]);

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Issue</DrawerTitle>
                </DrawerHeader>
                {usersLoading && <BarLoader width={"100%"} color="#36d7b7" />}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <Input {...register("title")} />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Assignee
                        </label>
                        <Controller
                            name="assigneeId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
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

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Priority
                        </label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
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

                    {error && (
                        <p className="text-red-500 mt-2">{error.message}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={updateLoading}
                        className="w-full"
                    >
                        {updateLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
