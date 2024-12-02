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
	callbacks: {
		// after authorize callback
		async jwt({ token, profile }) {
			if (profile) {
				token.uid = profile.id;
			}
			return token;
		},
		// after jwt callback
		async session({ session, token }) {
			session.user.uid = token.uid;
			return session;
		},
	},
} satisfies NextAuthConfig;
