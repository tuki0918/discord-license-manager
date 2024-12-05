import type { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		accessToken: string | null | undefined;
		user: {
			uid: string | null | undefined;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string | null;
		uid?: string | null;
	}
}
