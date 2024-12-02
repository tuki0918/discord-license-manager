"use server";

import { signIn as authSignIn } from "@/utils/auth";

export async function signIn(provider: string) {
	// No error handle is needed to use NEXT_REDIRECT.
	return await authSignIn(provider);
}
