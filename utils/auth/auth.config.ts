import { env } from "@/utils/dotenv";
import type { NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authConfig = {
	providers: [
		DiscordProvider({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
		}),
	],
} satisfies NextAuthConfig;
