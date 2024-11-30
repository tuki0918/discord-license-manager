import SideNav from "@/components/layouts/SideNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants";
import { auth } from "@/utils/auth";
import { env } from "@/utils/dotenv";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: {
		template: `%s - ${SITE_NAME}`,
		default: "Dashboard",
	},
	description: SITE_DESCRIPTION,
};

export default async function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();
	const isSidebarOpen = cookieStore.get("sidebar:state")?.value === "true";

	const session = await auth();
	// If the user is not an admin, redirect to the homepage
	if (session?.user?.email !== env.ADMIN_EMAIL) redirect("/");

	return (
		<>
			<SidebarProvider defaultOpen={isSidebarOpen}>
				<SideNav user={session.user} />
				<SidebarInset>
					<main>{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
