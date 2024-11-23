import type { User } from "@/domains/entity";
import type { FC } from "react";

const UserTable: FC<{
	users: User[];
}> = ({ users }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td>{user.id}</td>
						<td>{user.getFullName()}</td>
						<td>{user.age}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
