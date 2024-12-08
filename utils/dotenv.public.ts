import { g, validateEnv } from "@/libs/dotenv";

export const schema = g.envObject({
	NEXT_PUBLIC_DISCORD_INVITE_URL: g.envString().url(),
});

export const env = validateEnv(schema, {
	/**
	 * Next.js will replace process.env.customKey with 'my-value' at build time. Trying to destructure process.env variables won't work due to the nature of webpack
	 * https://nextjs.org/docs/pages/api-reference/next-config-js/env
	 */
	// NEXT_PUBLIC_XXX: process.env.NEXT_PUBLIC_XXX,
	NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
});
