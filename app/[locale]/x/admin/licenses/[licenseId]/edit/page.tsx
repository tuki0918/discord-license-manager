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
import { getGuildRoles } from "@/libs/discord";
import { Link } from "@/utils/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Edit License",
	};
}

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

	const roles = await getGuildRoles();

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link href="/x/admin/licenses">Licenses</Link>
								</BreadcrumbLink>
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
				<LicenseForm itemId={itemId} defaultValues={data} roles={roles || []} />
			</div>
		</>
	);
}
