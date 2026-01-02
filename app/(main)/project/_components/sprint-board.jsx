"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useFetch from "@/hooks/use-fetch";

import statuses from "@/data/status";
import { getIssuesForSprint, updateIssueOrder } from "@/actions/issues";

import SprintManager from "./sprint-manager";
import IssueCreationDrawer from "./create-issue";
import IssueCard from "@/components/issue-card";
import BoardFilters from "./board-filters";

// for reordering issues within the same column 
function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

// sprint kanban board
export default function SprintBoard({ sprints, projectId, orgId }) {
    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const {
        loading: issuesLoading,
        error: issuesError,
        fn: fetchIssues,
        data: issues,
        setData: setIssues,
    } = useFetch(getIssuesForSprint);

    const [filteredIssues, setFilteredIssues] = useState(issues);

    // Filters: Callback passed to BoardFilters component
    // It updates the local 'filteredIssues' state which is used for rendering the board
    const handleFilterChange = (newFilteredIssues) => {
        setFilteredIssues(newFilteredIssues);
    };

    useEffect(() => {
        if (currentSprint.id) {
            fetchIssues(currentSprint.id);
        }
    }, [currentSprint.id]);

    const handleAddIssue = (status) => {
        setSelectedStatus(status);
        setIsDrawerOpen(true);
    };

    const handleIssueCreated = () => {
        fetchIssues(currentSprint.id);
    };

    const {
        fn: updateIssueOrderFn,
        loading: updateIssuesLoading,
        error: updateIssuesError,
    } = useFetch(updateIssueOrder);

    // Kanban: Handle the end of a drag event
    const onDragEnd = async (result) => {

        // updates are not allowed for planned and completed sprints
        if (currentSprint.status === "PLANNED") {
            toast.warning("Start the sprint to update board");
            return;
        }
        if (currentSprint.status === "COMPLETED") {
            toast.warning("Cannot update board after sprint end");
            return;
        }
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        // no update if issue is dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newOrderedData = [...issues];

        // issues list of source column
        const sourceList = newOrderedData.filter(
            (list) => list.status === source.droppableId
        );

        // issues list of destination column
        const destinationList = newOrderedData.filter(
            (list) => list.status === destination.droppableId
        );

        if (source.droppableId === destination.droppableId) {

            // Reorder within the same column
            const reorderedCards = reorder(
                sourceList,
                source.index,
                destination.index
            );

            // update local order values
            reorderedCards.forEach((card, i) => {
                card.order = i;
            });
        } else {
            // Move between different columns
            const [movedCard] = sourceList.splice(source.index, 1);

            // update the status of the moved card to the new column
            movedCard.status = destination.droppableId;

            // insert into the destination list at the correct index
            destinationList.splice(destination.index, 0, movedCard);

            // reindexing both source and destination lists to ensure consistency
            sourceList.forEach((card, i) => {
                card.order = i;
            });

            destinationList.forEach((card, i) => {
                card.order = i;
            });
        }

        // Kanban: Optimistic UI update
        // updates the local state immediately for a smooth UX
        const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
        setIssues(newOrderedData, sortedIssues);

        // Kanban: Persist the changes to the database
        updateIssueOrderFn(sortedIssues);
    };

    // error handling
    if (issuesError) return <div>Error loading issues</div>;

    return (
        <div className="flex flex-col">
            <SprintManager
                sprint={currentSprint}
                setSprint={setCurrentSprint}
                sprints={sprints}
                projectId={projectId}
            />

            {issues && !issuesLoading && (
                <BoardFilters
                    issues={issues}
                    onFilterChange={handleFilterChange}
                />
            )}

            {updateIssuesError && (
                <p className="text-red-500 mt-2">{updateIssuesError.message}</p>
            )}

            {(updateIssuesLoading || issuesLoading) && (
                <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl">
                    {statuses.map((column) => (
                        <Droppable key={column.key} droppableId={column.key}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-2"
                                >
                                    <h3 className="font-bold text-lg text-center text-white tracking-wide mb-4 px-2">
                                        {column.name}
                                    </h3>
                                    {filteredIssues
                                        ?.filter(
                                            (issue) =>
                                                issue.status === column.key
                                        )
                                        .map((issue, index) => (
                                            <Draggable
                                                key={issue.id}
                                                draggableId={issue.id}
                                                index={index}
                                                isDragDisabled={
                                                    updateIssuesLoading
                                                }
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <IssueCard
                                                            issue={issue}
                                                            onDelete={() =>
                                                                fetchIssues(
                                                                    currentSprint.id
                                                                )
                                                            }
                                                            onUpdate={(
                                                                updated
                                                            ) =>
                                                                setIssues(
                                                                    (issues) =>
                                                                        issues.map(
                                                                            (
                                                                                issue
                                                                            ) => {
                                                                                if (
                                                                                    issue.id ===
                                                                                    updated.id
                                                                                )
                                                                                    return updated;
                                                                                return issue;
                                                                            }
                                                                        )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                    {column.key === "TODO" &&
                                        currentSprint.status !==
                                            "COMPLETED" && (
                                            <Button
                                                variant="outline"
                                                className="w-full hover:bg-gray-800 hover:text-white transition"
                                                onClick={() =>
                                                    handleAddIssue(column.key)
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Create Issue
                                            </Button>
                                        )}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <IssueCreationDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sprintId={currentSprint.id}
                status={selectedStatus}
                projectId={projectId}
                onIssueCreated={handleIssueCreated}
                orgId={orgId}
            />
        </div>
    );
}
