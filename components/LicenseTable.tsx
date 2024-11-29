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
import { Link } from "@/utils/i18n";
import { format } from "date-fns";
import { Check } from "lucide-react";
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
						<TableHead>EXPIRED_AT</TableHead>
						<TableHead className="text-center">STATUS</TableHead>
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
								<TableCell className="text-center">{license.code}</TableCell>
								<TableCell>{license.name}</TableCell>
								<TableCell>
									{format(license.expired_at, "yyyy/MM/dd HH:mm")}
								</TableCell>
								<TableCell className="text-center">
									<span className="sr-only">
										{license.status === "enable" ? "Enabled" : "Disabled"}
									</span>
									<span className="flex items-center justify-center">
										<Check
											className={cn({
												"text-green-600": license.status === "enable",
												"text-gray-400": license.status === "disabled",
											})}
										/>
									</span>
								</TableCell>
								<TableCell className="text-center">
									<Link
										href={`/x/admin/licenses/${license.id}`}
										className={buttonVariants({
											variant: "ghost",
										})}
									>
										{new Intl.NumberFormat().format(
											license._count.redeemLicenses,
										)}
									</Link>
								</TableCell>
								<TableCell>
									<LicenseTableRowAction license={license} />
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={7} className="text-center">
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
