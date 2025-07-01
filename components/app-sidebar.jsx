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
            title: "Activity log",
            url: `/project/${projectId}/activity`,
            icon: Calendar,
        },
        {
            title: "Settings",
            url: `/project/${projectId}/settings`,
            icon: Settings,
        },
    ];

    return (
        <Sidebar>
            <div className="px-1 py-2 flex justify-center border-b">
                <Link href="/">
                    <NextImage
                        src="/DashFlow_logo.png"
                        alt="DashFlow Logo"
                        width={140}
                        height={50}
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
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4 mr-2" />
                                            <span>{item.title}</span>
                                        </Link>
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
