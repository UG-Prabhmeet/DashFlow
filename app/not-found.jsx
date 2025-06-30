"use client";

import { useRouter } from "next/navigation";
import { Ghost, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-950">
            <div className="relative flex items-center justify-center">
                <span className="text-[10rem] md:text-[14rem] gradient-title select-none">
                    4
                </span>
                <span className="mx-2 flex items-center justify-center z-10">
                    <Lock
                        size={100}
                        className="text-gray-400 md:w-[120px] md:h-[120px]"
                    />
                </span>
                <span className="text-[10rem] md:text-[14rem] gradient-title select-none">
                    4
                </span>
            </div>
            <div className="text-center">
                <div className="text-xl md:text-2xl gradient-title">
                    Page Not Found
                </div>
                <div className="gradient-title mt-1 mb-4 text-sm md:text-base">
                    Sorry, the page you are looking for does not exist.
                </div>
                <Button
                    variant="default"
                    size="lg"
                    onClick={() => router.push("/")}
                >
                    Go Home
                </Button>
            </div>
        </div>
    );
}
