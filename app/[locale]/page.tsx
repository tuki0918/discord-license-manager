import LanguageSelectMenu from "@/components/LanguageSelectMenu";
import RedeemRewardForm, {
	RedeemRewardSignInForm,
} from "@/components/RedeemRewardForm";
import UserDropdownMenu from "@/components/UserDropdownMenu";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/utils/auth";
import { env } from "@/utils/dotenv";

export default async function Page() {
	const session = await auth();
	const isAdmin = session?.user?.email === env.ADMIN_EMAIL;
	const isLoggedIn = !!session?.user;

	return (
		<div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
			<div>
				{isLoggedIn && (
					<div className="absolute top-4 right-4">
						<UserDropdownMenu user={session.user} isAdmin={isAdmin} />
					</div>
				)}

				<div className="flex items-center justify-center">
					{isLoggedIn ? <RedeemRewardForm /> : <RedeemRewardSignInForm />}
				</div>

				<Separator className="my-8" />

				<div className="flex items-center justify-center">
					<LanguageSelectMenu />
				</div>
			</div>
		</div>
	);
}
