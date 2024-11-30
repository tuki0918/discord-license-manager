"use client";

import LicenseTableRowAction from "@/components/LicenseTableRowAction";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import type { LicenseType } from "@/domain/models";
import { Link } from "@/utils/i18n";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Check, Minus } from "lucide-react";

export const columns: ColumnDef<
	LicenseType & {
		_count: { redeemLicenses: number };
	}
>[] = [
	{
		accessorKey: "id",
		header: "ID",
		enableHiding: false,
	},
	{
		accessorKey: "code",
		header: () => <div className="text-center">Code</div>,
		cell: ({ row }) => {
			const license = row.original;
			return <div className="text-center">{license.code}</div>;
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "expired_at",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Expired At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const license = row.original;
			return format(license.expired_at, "yyyy/MM/dd HH:mm");
		},
	},
	{
		accessorKey: "status",
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const license = row.original;
			return (
				<div className="text-center">
					<span className="sr-only">
						{license.status === "enable" ? "Enabled" : "Disabled"}
					</span>
					<span className="flex items-center justify-center">
						{license.status === "enable" ? (
							<Check className="text-green-600" />
						) : (
							<Minus className="text-gray-400" />
						)}
					</span>
				</div>
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: "_count.redeemLicenses",
		header: () => <div className="text-center">Alive</div>,
		cell: ({ row }) => {
			const license = row.original;
			return (
				<div className="text-center">
					<Link
						href={`/x/admin/redeems?code=${license.code}`}
						className={buttonVariants({
							variant: "ghost",
						})}
					>
						{new Intl.NumberFormat().format(license._count.redeemLicenses)}
					</Link>
				</div>
			);
		},
		enableHiding: false,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const license = row.original;
			return <LicenseTableRowAction license={license} />;
		},
		enableHiding: false,
	},
];
