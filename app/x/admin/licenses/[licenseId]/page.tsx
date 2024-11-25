import LicenseTable from "@/components/LicenseTable";
import RedeemLicenseTable from "@/components/RedeemLicenseTable";
import prisma from "@/libs/db";
import { notFound } from "next/navigation";

type PageProps = {
	params: { licenseId: string };
};

export default async function Page({ params }: PageProps) {
	const { licenseId } = params;
	const itemId = Number.parseInt(licenseId, 10);

	const data = await prisma.license.findUnique({
		include: {
			redeemLicenses: true,
			_count: {
				select: {
					redeemLicenses: {
						where: { status: "enable" },
					},
				},
			},
		},
		where: { id: itemId },
	});

	if (!data) {
		notFound();
	}

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div className="mb-4 flex justify-between items-end">
						<div>
							<h2 className="text-3xl font-bold">License</h2>
							<p className="text-muted-foreground">...</p>
						</div>
					</div>
					<div>
						<LicenseTable licenses={[data]} />
					</div>

					<div className="mt-8 mb-4 flex justify-between items-end">
						<div>
							<h2 className="text-3xl font-bold">Redeems</h2>
							<p className="text-muted-foreground">...</p>
						</div>
					</div>
					<div>
						<RedeemLicenseTable redeemLicenses={data.redeemLicenses} />
					</div>
				</div>
			</div>
		</div>
	);
}
