import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LicenseType } from "@/domain/models";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

const LicenseTableRowAction: FC<{
	license: LicenseType;
}> = ({ license }) => {
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
				<Link href={`/licenses/${license.id}/edit`}>
					<DropdownMenuItem className="hover:cursor-pointer">
						Edit
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LicenseTableRowAction;
