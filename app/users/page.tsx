import UserTable from "@/components/UserTable";
import { User } from "@/domains/entity/User";
import { getDBConnection } from "@/utils/postgres";

export default async function Page() {
	const connection = await getDBConnection();
	const userRepository = connection.getRepository(User);
	const users = await userRepository.find();

	return (
		<div className="h-screen flex items-center justify-center">
			<UserTable users={users} />
		</div>
	);
}
