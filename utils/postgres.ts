import { User } from "@/domains/entity";
import { env } from "@/utils/env";
import { DataSource } from "typeorm";

export const pgConnection = new DataSource({
	type: "postgres",
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	synchronize: false,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
});

export const getDBConnection = async (): Promise<DataSource> => {
	if (!pgConnection.isInitialized) {
		await pgConnection.initialize();
	}
	return pgConnection;
};
