import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/license-columns";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import prisma from "@/libs/db";
import { Link } from "@/utils/i18n";
import { PlusCircleIcon } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Licenses",
	};
}

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
		<>
			<header className="flex h-16 shrink-0 items-center justify-between gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Licenses</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="px-4">
					<Link href="/x/admin/licenses/new" className={buttonVariants()}>
						<PlusCircleIcon className="h-4 w-4" />
						New
					</Link>
				</div>
			</header>
			<div className="p-4 pt-0">
				<DataTable columns={columns} data={licenses} />
			</div>
		</>
	);
}
