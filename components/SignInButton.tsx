"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "@/usecases/forms/auth";

export default function SignIn() {
	return (
		<form
			action={async () => {
				await signIn("discord");
			}}
		>
			<Button type="submit" variant="outline">
				<Icons.discord />
				Sign in with Discord
			</Button>
		</form>
	);
}
