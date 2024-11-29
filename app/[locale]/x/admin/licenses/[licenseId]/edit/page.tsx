import LicenseForm from "@/components/LicenseForm";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import prisma from "@/libs/db";
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
		<>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href=".">Licenses</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Edit</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 pt-0">
				<LicenseForm itemId={itemId} defaultValues={data} />
			</div>
		</>
	);
}
