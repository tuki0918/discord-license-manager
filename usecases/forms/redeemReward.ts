"use server";

import type { formSchema as redeemRewardFormSchema } from "@/components/RedeemRewardForm";
import { License, RedeemLicenseDraft } from "@/domain/models";
import prisma from "@/libs/db";
import {
	getGuildMemner,
	getGuildRole,
	putGuildMemberRole,
} from "@/libs/discord";
import type { z } from "zod";

abstract class RedeemRewardError extends Error {}
class GuildNotJoinedError extends RedeemRewardError {}
class InvalidLicenseCodeError extends RedeemRewardError {}
class DisabledLicenseCodeError extends RedeemRewardError {}
class ExpiredLicenseCodeError extends RedeemRewardError {}
class RoleNotFoundError extends RedeemRewardError {}

export const redeemReward = async (
	values: z.infer<typeof redeemRewardFormSchema>,
) => {
	try {
		const { code, discord_id } = values;
		await checkGuildMember(discord_id);
		const license = await validateLicenseCode(code);
		const role = await fetchGuildRole(license.discordGrantRoleId);

		const redeemLicense = RedeemLicenseDraft.create({
			code: license.code,
			status: "enable",
			redeemed_at: new Date(),
			discord_id,
			discord_grant_role_id: role.id,
		});
		await storeAndAssignRole(redeemLicense);
	} catch (err) {
		console.error(err);
		if (err instanceof RedeemRewardError) {
			throw err;
		}
		throw new Error("Failed to assign role");
	}
};

const checkGuildMember = async (discordId: string) => {
	const member = await getGuildMemner(discordId);
	if (!member) {
		throw new GuildNotJoinedError("You are not a member of the guild.");
	}
};

const validateLicenseCode = async (code: string) => {
	const data = await prisma.license.findUnique({ where: { code } });
	if (!data) {
		throw new InvalidLicenseCodeError("Invalid license code");
	}

	const license = License.create(data);

	if (!license.isEnable()) {
		throw new DisabledLicenseCodeError("This license code is disabled");
	}

	if (license.isExpired()) {
		throw new ExpiredLicenseCodeError("This license code is expired");
	}

	return license;
};

const fetchGuildRole = async (roleId: string) => {
	const role = await getGuildRole(roleId);
	if (!role) {
		throw new RoleNotFoundError("Failed to get the role");
	}
	return role;
};

const storeAndAssignRole = async (redeemLicense: RedeemLicenseDraft) => {
	const data = await prisma.redeemLicense.findUnique({
		where: {
			code_discord_id: {
				code: redeemLicense.code,
				discord_id: redeemLicense.discordId,
			},
		},
	});

	await prisma.$transaction(async (db) => {
		if (data !== null) {
			await db.redeemLicense.update({
				data: redeemLicense.toDB(),
				where: { id: data.id },
			});
		} else {
			await db.redeemLicense.create({ data: redeemLicense.toDB() });
		}
		await putGuildMemberRole(
			redeemLicense.discordId,
			redeemLicense.discordGrantRoleId,
		);
	});
};
