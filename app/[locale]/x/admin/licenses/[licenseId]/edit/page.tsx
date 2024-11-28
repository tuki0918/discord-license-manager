import LicenseForm from "@/components/LicenseForm";
import prisma from "@/libs/db";
import { Link } from "@/utils/i18n/routing";
import { Key } from "lucide-react";
import { notFound } from "next/navigation";

type PageProps = {
	params: { licenseId: string };
};

export default async function Page({ params }: PageProps) {
	const { licenseId } = params;
	const itemId = Number.parseInt(licenseId, 10);

	const data = await prisma.license.findUnique({
		where: { id: itemId },
	});

	if (!data) {
		notFound();
	}

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex justify-center">
							<Link href={"/x/admin/licenses"}>
								<Key color="#333333" size={48} />
							</Link>
						</h1>
					</div>
					<div>
						<LicenseForm itemId={itemId} defaultValues={data} />
					</div>
				</div>
			</div>
		</div>
	);
}
