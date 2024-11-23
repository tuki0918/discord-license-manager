import { g, validateEnv } from "@/libs/dotenv";

const schema = g.envObject({
	DB_HOST: g.envString(),
	DB_PORT: g.envNumber(),
	DB_USER: g.envString(),
	DB_PASSWORD: g.envString(),
	DB_NAME: g.envString(),
});

const env = validateEnv(schema);

export { env };
