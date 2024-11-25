import LicenseTable from "@/components/LicenseTable";
import prisma from "@/libs/db";

export default async function Page() {
	const licenses = await prisma.license.findMany();

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<LicenseTable licenses={licenses} />
			</div>
		</div>
	);
}
