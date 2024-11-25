import LicenseTableRowAction from "@/components/LicenseTableRowAction";
import { buttonVariants } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { LicenseType } from "@/domain/models";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { Check, CircleX } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

const LicenseTable: FC<{
	licenses: (LicenseType & {
		_count: { redeemLicenses: number };
	})[];
}> = ({ licenses }) => {
	return (
		<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">ID</TableHead>
						<TableHead className="text-center">CODE</TableHead>
						<TableHead>NAME</TableHead>
						<TableHead className="text-center">STATUS</TableHead>
						<TableHead>ROLE_ID</TableHead>
						<TableHead>EXPIRED_AT</TableHead>
						<TableHead className="text-center">ALIVE</TableHead>
						<TableHead />
					</TableRow>
				</TableHeader>
				<TableBody>
					{licenses.length > 0 ? (
						licenses.map((license) => (
							<TableRow
								key={license.id}
								className={cn({
									"bg-muted": license.status === "disabled",
								})}
							>
								<TableCell className="text-center">{license.id}</TableCell>
								<TableCell className="text-center">
									<Link
										href={`/x/admin/licenses/${license.id}`}
										className={buttonVariants({
											variant: "ghost",
										})}
									>
										{license.code}
									</Link>
								</TableCell>
								<TableCell>{license.name}</TableCell>
								<TableCell className="text-center">
									<span className="sr-only">
										{license.status === "enable" ? "Enabled" : "Disabled"}
									</span>
									<span className="flex items-center justify-center">
										{license.status === "enable" ? (
											<Check className="text-green-600" />
										) : (
											<CircleX className="text-gray-400" />
										)}
									</span>
								</TableCell>
								<TableCell>{license.discord_grant_role_id}</TableCell>
								<TableCell>
									{format(license.expired_at, "yyyy/MM/dd HH:mm")}
								</TableCell>
								<TableCell className="text-center">
									{new Intl.NumberFormat().format(
										license._count.redeemLicenses,
									)}
								</TableCell>
								<TableCell>
									<LicenseTableRowAction license={license} />
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={8} className="text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default LicenseTable;
