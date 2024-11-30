"use client";

import RedeemLicenseTableRowAction from "@/components/RedeemLicenseTableRowAction";
import { Button } from "@/components/ui/button";
import type { RedeemLicenseType } from "@/domain/models";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Check, Minus } from "lucide-react";

export const columns: ColumnDef<RedeemLicenseType>[] = [
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
		accessorKey: "discord_id",
		header: "Discord ID",
	},
	{
		accessorKey: "redeemed_at",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
				>
					Redeemed At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const license = row.original;
			return format(license.redeemed_at, "yyyy/MM/dd HH:mm");
		},
	},
	{
		accessorKey: "status",
		header: () => <div className="text-center">Alive</div>,
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
		id: "actions",
		cell: ({ row }) => {
			const redeemLicense = row.original;
			return <RedeemLicenseTableRowAction redeemLicense={redeemLicense} />;
		},
		enableHiding: false,
	},
];
