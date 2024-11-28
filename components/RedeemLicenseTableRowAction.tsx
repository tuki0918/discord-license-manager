import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RedeemLicenseType } from "@/domain/models";
import { Link } from "@/utils/i18n/routing";
import { MoreHorizontal, Pencil } from "lucide-react";
import type { FC } from "react";

const RedeemLicenseTableRowAction: FC<{
	redeemLicense: RedeemLicenseType;
}> = ({ redeemLicense }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<Link href={`/x/admin/redeems/${redeemLicense.id}/edit`}>
					<DropdownMenuItem className="hover:cursor-pointer">
						<Pencil /> Edit
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default RedeemLicenseTableRowAction;
