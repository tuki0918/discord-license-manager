import LicenseTable from "@/components/LicenseTable";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/libs/db";
import { Link } from "@/utils/i18n";
import { PlusCircleIcon } from "lucide-react";

export default async function Page() {
	const licenses = await prisma.license.findMany({
		// Include the active redeem licenses count
		include: {
			_count: {
				select: {
					redeemLicenses: {
						where: { status: "enable" },
					},
				},
			},
		},
	});

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div className="mb-4 flex justify-between items-end">
						<div>
							<h2 className="text-3xl font-bold">License</h2>
							<p className="text-muted-foreground">...</p>
						</div>
						<Link href="/x/admin/licenses/new" className={buttonVariants()}>
							<PlusCircleIcon className="h-4 w-4" />
							New
						</Link>
					</div>
					<div>
						<LicenseTable licenses={licenses} />
					</div>
				</div>
			</div>
		</div>
	);
}
