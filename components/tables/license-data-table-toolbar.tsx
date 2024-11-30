"use client";

import { DataTableViewOptions } from "@/components/tables/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Check, Minus, X } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export const statuses = [
	{
		value: "enable",
		label: "Enable",
		icon: Check,
	},
	{
		value: "disabled",
		label: "Disabled",
		icon: Minus,
	},
];

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter licenses..."
					value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("code")?.setFilterValue(event.target.value)
					}
					className="h-8 max-w-sm"
				/>
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
