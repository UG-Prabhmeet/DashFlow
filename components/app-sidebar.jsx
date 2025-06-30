"use client";
import { useParams } from "next/navigation";
import {
    Calendar,
    KanbanSquare,
    FileBarChart,
    LayoutDashboard,
    Settings,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import NextImage from "next/image";
import Link from "next/link";

// Dynamic sidebar
export function AppSidebar() {
    const { projectId } = useParams();

    const items = [
        {
            title: "Overview",
            url: `/project/${projectId}/overview`,
            icon: LayoutDashboard,
        },
        {
            title: "Board",
            url: `/project/${projectId}/board`,
            icon: KanbanSquare,
        },
        {
            title: "Reports",
            url: `/project/${projectId}/report`,
            icon: FileBarChart,
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ];

    return (
        <Sidebar>
            <div className="px-1 py-0.9 flex justify-center border-b">
                <Link href="/">
                    <NextImage
                        src="/logo2.png"
                        alt="DashFlow Logo"
                        width={140}
                        height={40}
                        className="object-contain cursor-pointer"
                        priority
                    />
                </Link>
            </div>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Project</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon className="h-4 w-4 mr-2" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
