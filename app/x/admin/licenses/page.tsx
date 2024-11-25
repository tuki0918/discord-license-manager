import LicenseTable from "@/components/LicenseTable";
import prisma from "@/libs/db";

export default async function Page() {
	const licenses = await prisma.license.findMany();

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div className="mb-4">
						<h2 className="text-3xl font-bold">License</h2>
						<p className="text-muted-foreground">Manage your licenses here.</p>
					</div>
					<div>
						<LicenseTable licenses={licenses} />
					</div>
				</div>
			</div>
		</div>
	);
}
