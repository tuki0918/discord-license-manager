import { User } from "@/domains/entity/User";
import { getDBConnection } from "@/utils/postgres";

export const GET = async (req: Request) => {
	try {
		const connection = await getDBConnection();
		const userRepository = connection.getRepository(User);
		const users = await userRepository.find();

		return Response.json({ success: true, message: "Success", data: users });
	} catch (err) {
		console.error(err);
		return Response.json({ success: false, message: "Error" }, { status: 500 });
	}
};
