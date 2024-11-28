import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { RedeemLicenseType } from "@/domain/models";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { Check } from "lucide-react";
import type { FC } from "react";

const RedeemLicenseTable: FC<{
	redeemLicenses: RedeemLicenseType[];
}> = ({ redeemLicenses }) => {
	return (
		<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">ID</TableHead>
						<TableHead className="text-center">CODE</TableHead>
						<TableHead>REDEEMED_AT</TableHead>
						<TableHead>DISCORD_ID</TableHead>
						<TableHead>ROLE_ID</TableHead>
						<TableHead className="text-center">ALIVE</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{redeemLicenses.length > 0 ? (
						redeemLicenses.map((redeemLicense) => (
							<TableRow
								key={redeemLicense.id}
								className={cn({
									"bg-muted": redeemLicense.status === "disabled",
								})}
							>
								<TableCell className="text-center">
									{redeemLicense.id}
								</TableCell>
								<TableCell className="text-center">
									{redeemLicense.code}
								</TableCell>
								<TableCell>
									{format(redeemLicense.redeemed_at, "yyyy/MM/dd HH:mm:ss")}
								</TableCell>
								<TableCell>{redeemLicense.discord_id}</TableCell>
								<TableCell>{redeemLicense.discord_grant_role_id}</TableCell>
								<TableCell className="text-center">
									<span className="sr-only">
										{redeemLicense.status === "enable" ? "Enabled" : "Disabled"}
									</span>
									<span className="flex items-center justify-center">
										<Check
											className={cn({
												"text-green-600": redeemLicense.status === "enable",
												"text-gray-400": redeemLicense.status === "disabled",
											})}
										/>
									</span>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default RedeemLicenseTable;
