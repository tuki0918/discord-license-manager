import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { LicenseType } from "@/domain/models";
import type { FC } from "react";

const LicenseTable: FC<{
	licenses: LicenseType[];
}> = ({ licenses }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>CODE</TableHead>
					<TableHead>NAME</TableHead>
					<TableHead>STATUS</TableHead>
					<TableHead>ROLE_ID</TableHead>
					<TableHead>EXPIRED_AT</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{licenses.map((license) => (
					<TableRow key={license.id}>
						<TableCell>{license.id}</TableCell>
						<TableCell>{license.code}</TableCell>
						<TableCell>{license.name}</TableCell>
						<TableCell>{license.status}</TableCell>
						<TableCell>{license.discord_grant_role_id}</TableCell>
						<TableCell>{license.expired_at.toDateString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default LicenseTable;