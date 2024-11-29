"use client";

import SideNavUser from "@/components/layouts/SideNavUser";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/utils/i18n";
import { Home, Key, Users } from "lucide-react";
import type { User } from "next-auth";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
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
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.url}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
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
