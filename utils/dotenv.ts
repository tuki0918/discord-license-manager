import { g, validateEnv } from "@/libs/dotenv";

const schema = g.envObject({
	DATABASE_URL: g.envString(),
	NEXTAUTH_URL: g.envString().url(),
	AUTH_SECRET: g.envString(),
});

export const env = validateEnv(schema);
