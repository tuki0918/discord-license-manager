import SideBar from "@/components/layouts/SideBar";

export default function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="grid grid-cols-5">
				<SideBar />

				<div className="col-span-4 border-l">{children}</div>
			</div>
		</>
	);
}
