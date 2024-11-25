import LicenseForm from "@/components/LicenseForm";
import prisma from "@/libs/db";
import { notFound } from "next/navigation";

type PageProps = {
	params: { licenseId: string };
};

export default async function Page({ params }: PageProps) {
	const { licenseId } = params;
	const data = await prisma.license.findUnique({
		where: { id: Number(licenseId) },
	});

	if (!data) {
		notFound();
	}

	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<LicenseForm itemId={String(data.id)} defaultValues={data} />
			</div>
		</div>
	);
}
