import SignInButton from "@/components/SignInButton";
import UserDropdownMenu from "@/components/UserDropdownMenu";
import { auth } from "@/utils/auth";
import { env } from "@/utils/dotenv";

export default async function Page() {
	const session = await auth();
	const isLoggedIn = !!session?.user;
	const isAdmin = session?.user?.email === env.ADMIN_EMAIL;
	return (
		<div className="relative h-screen flex items-center justify-center">
			{session?.user && (
				<div className="absolute top-4 right-4">
					<UserDropdownMenu user={session.user} isAdmin={isAdmin} />
				</div>
			)}
			<div>
				<h1>Hello World</h1>
				{!isLoggedIn && <SignInButton />}
			</div>
		</div>
	);
}
