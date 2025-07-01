"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function ActivityFilters({ activity, members }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [filtered, setFiltered] = useState(activity || []);

    useEffect(() => {
        const filtered = activity.filter((item) => {
            const matchesSearch = item.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesUser =
                selectedUsers.length === 0 ||
                selectedUsers.includes(item.user?.id);

            const matchesDate =
                !selectedDate ||
                new Date(item.createdAt).toDateString() ===
                    new Date(selectedDate).toDateString();

            return matchesSearch && matchesUser && matchesDate;
        });

        setFiltered(filtered);
    }, [searchTerm, selectedUsers, selectedDate, activity]);

    const toggleUser = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedUsers([]);
        setSelectedDate("");
    };

    const isFiltersApplied =
        searchTerm || selectedUsers.length > 0 || selectedDate;

    return (
        <>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {/* Search */}
                    <Input
                        className="w-full sm:w-72"
                        placeholder="Search activity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Assignees */}
                    <div className="flex gap-2 items-center">
                        {members.map((user, i) => {
                            const selected = selectedUsers.includes(user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => toggleUser(user.id)}
                                    className={`rounded-full ring ${
                                        selected
                                            ? "ring-blue-600"
                                            : "ring-transparent"
                                    } cursor-pointer ${i > 0 ? "-ml-6" : ""}`}
                                    style={{ zIndex: i }}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.imageUrl} />
                                        <AvatarFallback>
                                            {user.name?.[0]?.toUpperCase() ||
                                                "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            );
                        })}
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full sm:w-52 justify-start"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate
                                    ? format(
                                          new Date(selectedDate),
                                          "MMM dd, yyyy"
                                      )
                                    : "Select Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <input
                                type="date"
                                className="p-2 w-full"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Clear Filters */}
                    {isFiltersApplied && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="flex items-center"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

            {/* Filtered Activity Output */}
            <div className="space-y-2 text-sm mt-4">
                {filtered.length > 0 ? (
                    filtered.map((a) => (
                        <div
                            key={a.id}
                            className="p-3 bg-gray-800 rounded shadow"
                        >
                            <p>
                                <span className="font-semibold">
                                    {a.user?.name || a.user?.email || "Someone"}
                                </span>{" "}
                                {a.description}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {new Date(a.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No activity found.</p>
                )}
            </div>
        </>
    );
}
