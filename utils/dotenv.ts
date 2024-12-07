import { g, validateEnv } from "@/libs/dotenv";

const publicSchema = g.envObject({
	NEXT_PUBLIC_DISCORD_INVITE_URL: g.envString().url(),
});

const privateSchema = g.envObject({
	DATABASE_URL: g.envString(),
	AUTH_URL: g.envString().url(),
	AUTH_SECRET: g.envString(),
	AUTH_DISCORD_ID: g.envString(),
	AUTH_DISCORD_SECRET: g.envString(),
	DISCORD_BOT_TOKEN: g.envString(),
	DISCORD_GUILD_ID: g.envString(),
	ADMIN_EMAIL: g.envString(),
});

export const env = validateEnv(publicSchema.merge(privateSchema));
export const publicEnv = validateEnv(publicSchema);
