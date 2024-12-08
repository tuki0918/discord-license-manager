"use client";

import SideNavUser from "@/components/layouts/SideNavUser";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SITE_NAME } from "@/constants";
import { Link, usePathname } from "@/utils/i18n";
import { Home, Key, Users } from "lucide-react";
import type { User } from "next-auth";

const items = [
	{
		title: "Licenses",
		url: "/x/admin/licenses",
		icon: Key,
	},
	{
		title: "Redeems",
		url: "/x/admin/redeems",
		icon: Users,
	},
];

export default function SideNav({ user }: { user: User }) {
	const pathname = usePathname();
	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Home className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">{SITE_NAME}</span>
									<span className="">Management System</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.url}>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SideNavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
