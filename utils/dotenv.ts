import { g, validateEnv } from "@/libs/dotenv";

const schema = g.envObject({
	DATABASE_URL: g.envString(),
	AUTH_SECRET: g.envString(),
});

export const env = validateEnv(schema);
