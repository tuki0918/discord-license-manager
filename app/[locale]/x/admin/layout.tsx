import SideBar from "@/components/layouts/SideBar";
import { auth } from "@/utils/auth";
import { env } from "@/utils/dotenv";
import { redirect } from "next/navigation";

export default async function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	// If the user is not an admin, redirect to the homepage
	if (session?.user?.email !== env.ADMIN_EMAIL) redirect("/");

	return (
		<>
			<div className="grid grid-cols-5">
				<SideBar />

				<div className="col-span-4 border-l">{children}</div>
			</div>
		</>
	);
}
