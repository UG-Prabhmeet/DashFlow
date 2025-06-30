import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProjectLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="container mx-auto">
                <SidebarTrigger />
                <Suspense
                    fallback={<BarLoader width={"100%"} color="#36d7b7" />}
                >
                    {children}
                </Suspense>
            </div>
        </SidebarProvider>
    );
}
