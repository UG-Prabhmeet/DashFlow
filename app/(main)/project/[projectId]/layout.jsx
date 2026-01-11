import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProjectLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="container mx-auto mt-5">
                <SidebarTrigger className="bg-[--sidebar-accent] text-[--sidebar-accent-foreground] bg-[oklch(0.9_0_0)] px-2 py-1 rounded-md mb-4" />

                <Suspense
                    fallback={<BarLoader width={"100%"} color="#36d7b7" />}
                >
                    {children}
                </Suspense>
            </div>
        </SidebarProvider>
    );
}
