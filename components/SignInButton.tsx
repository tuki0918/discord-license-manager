"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "@/usecases/forms/auth";
import { useTranslations } from "next-intl";

export default function SignIn() {
	const t = useTranslations("Components/SignIn");
	return (
		<form
			action={async () => {
				await signIn("discord");
			}}
		>
			<Button type="submit" variant="outline">
				<Icons.discord />
				{t("discord")}
			</Button>
		</form>
	);
}
