"use server";

import { signIn as authSignIn } from "@/utils/auth";

export async function signIn(provider: string) {
	try {
		return await authSignIn(provider);
	} catch (error) {
		console.error("Failed to sign in:", error);
		throw new Error("Sign in failed");
	}
}
