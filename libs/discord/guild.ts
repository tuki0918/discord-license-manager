import { env } from "@/utils/dotenv";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import type {
	RESTGetAPIGuildMemberResult,
	RESTGetAPIGuildRoleResult,
	RESTGetAPIGuildRolesResult,
	RESTPutAPIGuildMemberRoleResult,
} from "discord-api-types/v10";

const guildId = env.DISCORD_GUILD_ID;
const rest = new REST({ version: "10" }).setToken(env.DISCORD_BOT_TOKEN);

export class DiscordAPIError extends Error {}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-role
 */
export async function getGuildRole(roleId: string) {
	try {
		return (await rest.get(
			Routes.guildRole(guildId, roleId),
		)) as RESTGetAPIGuildRoleResult;
	} catch (error) {
		console.error(error);
		throw new DiscordAPIError("Failed to get the role");
	}
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-roles
 */
export async function getGuildRoles() {
	try {
		return (await rest.get(
			Routes.guildRoles(guildId),
		)) as RESTGetAPIGuildRolesResult;
	} catch (error) {
		console.error(error);
		throw new DiscordAPIError("Failed to get the roles");
	}
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-member
 */
export async function getGuildMemner(id: string) {
	try {
		return (await rest.get(
			Routes.guildMember(guildId, id),
		)) as RESTGetAPIGuildMemberResult;
	} catch (error) {
		console.error(error);
		throw new DiscordAPIError("Failed to get the member");
	}
}

/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member-role
 */
export async function putGuildMemberRole(userId: string, roleId: string) {
	try {
		return (await rest.put(
			Routes.guildMemberRole(guildId, userId, roleId),
		)) as RESTPutAPIGuildMemberRoleResult;
	} catch (error) {
		console.error(error);
		throw new DiscordAPIError("Failed to put the member role");
	}
}
