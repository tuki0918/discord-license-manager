import { g, validateEnv } from "@/libs/dotenv";

const schema = g.envObject({
	DATABASE_URL: g.envString(),
});

export const env = validateEnv(schema);
