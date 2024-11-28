import RedeemLicenseTable from "@/components/RedeemLicenseTable";
import prisma from "@/libs/db";

export default async function Page() {
	const redeemLicenses = await prisma.redeemLicense.findMany();

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div className="mb-4 flex justify-between items-end">
						<div>
							<h2 className="text-3xl font-bold">Redeems</h2>
							<p className="text-muted-foreground">...</p>
						</div>
					</div>
					<div>
						<RedeemLicenseTable redeemLicenses={redeemLicenses} />
					</div>
				</div>
			</div>
		</div>
	);
}
