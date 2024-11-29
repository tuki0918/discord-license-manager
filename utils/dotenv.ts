import { g, validateEnv } from "@/libs/dotenv";

const schema = g.envObject({
	DATABASE_URL: g.envString(),
	AUTH_URL: g.envString().url(),
	AUTH_SECRET: g.envString(),
	AUTH_DISCORD_ID: g.envString(),
	AUTH_DISCORD_SECRET: g.envString(),
});

export const env = validateEnv(schema);
