"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { createComment, getComments } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { highlightMentions } from "@/lib/utils/highlightMentions";

export default function IssueComments({ issueId }) {
    const { isLoaded } = useUser();
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!issueId) return;

        const loadComments = async () => {
            try {
                const result = await getComments(issueId);
                setComments(result);
            } catch (err) {
                setError("Failed to load comments");
                console.error(err);
            }
        };

        loadComments();
    }, [issueId]);

    const handlePost = () => {
        if (!input.trim()) return;

        startTransition(async () => {
            try {
                const newComment = await createComment({
                    issueId,
                    content: input,
                });

                setComments([...comments, newComment]);
                setInput("");
            } catch (err) {
                console.error("🚨 Comment post failed:", err.message);
                setError(err.message);
            }
        });
    };

    if (!isLoaded) return null;

    return (
        <div className="mt-6">
            <h4 className="font-semibold text-sm mb-2">Comments</h4>

            <div className="space-y-3 max-h-48 overflow-y-auto border rounded px-3 py-2 bg-muted/30">
                {comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                        No comments yet.
                    </p>
                ) : (
                    comments.map((c) => (
                        <div
                            key={c.id}
                            className="text-sm bg-white p-2 rounded shadow-sm"
                        >
                            <div className="text-xs text-muted-foreground flex justify-between">
                                <span>{c.author.name || "Unknown User"}</span>
                                <span>
                                    {new Date(c.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-1 text-black whitespace-pre-wrap">
                                {highlightMentions(c.content)}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-3 flex items-center gap-2">
                <input
                    className="flex-1 px-3 py-1 border rounded text-sm"
                    placeholder="Write a comment..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    onClick={handlePost}
                    disabled={isPending || !input.trim()}
                >
                    {isPending ? "Posting..." : "Post"}
                </Button>
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
