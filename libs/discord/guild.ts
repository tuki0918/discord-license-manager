import { env } from "@/utils/dotenv";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import type { RESTGetAPIGuildRolesResult } from "discord-api-types/v10";

const guildId = env.DISCORD_GUILD_ID;
const rest = new REST({ version: "10" }).setToken(env.DISCORD_BOT_TOKEN);

export async function getGuildRoles() {
	try {
		return (await rest.get(
			Routes.guildRoles(guildId),
		)) as RESTGetAPIGuildRolesResult;
	} catch (error) {
		console.error(error);
	}
}
