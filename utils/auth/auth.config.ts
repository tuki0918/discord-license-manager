import { env } from "@/utils/dotenv";
import type { NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify", "email", "guilds.join"];

export const authConfig = {
	providers: [
		DiscordProvider({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
			authorization: `https://discord.com/api/oauth2/authorize?scope=${scopes.join("+")}`,
		}),
	],
	callbacks: {
		// after authorize callback
		async jwt({ token, profile, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.uid = profile.id;
			}
			return token;
		},
		// after jwt callback
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.user.uid = token.uid;
			return session;
		},
	},
} satisfies NextAuthConfig;
