"use server";

import type { formSchema as redeemRewardFormSchema } from "@/components/RedeemRewardForm";
import { License, RedeemLicenseDraft } from "@/domain/models";
import prisma from "@/libs/db";
import {
	addGuildMember,
	getGuildMemner,
	getGuildRole,
	putGuildMemberRole,
} from "@/libs/discord";
import { auth } from "@/utils/auth";
import type { z } from "zod";

abstract class RedeemRewardError extends Error {}
class DiscordNotLoggedInError extends RedeemRewardError {}
class InvalidLicenseCodeError extends RedeemRewardError {}
class DisabledLicenseCodeError extends RedeemRewardError {}
class ExpiredLicenseCodeError extends RedeemRewardError {}
class RoleNotFoundError extends RedeemRewardError {}

export const redeemReward = async (
	values: z.infer<typeof redeemRewardFormSchema>,
) => {
	try {
		const session = await auth();
		if (!session || !session.user.uid || !session.accessToken) {
			throw new DiscordNotLoggedInError("You are not logged in");
		}
		const {
			user: { uid: discord_id },
			accessToken,
		} = session;
		const { code } = values;
		const license = await validateLicenseCode(code);
		const role = await fetchGuildRole(license.discordGrantRoleId);

		const redeemLicense = RedeemLicenseDraft.create({
			code: license.code,
			status: "enable",
			redeemed_at: new Date(),
			discord_id,
			discord_grant_role_id: role.id,
		});

		const isExist = await isExistGuildMember(discord_id);
		if (!isExist) {
			await storeAndAssignRole(redeemLicense, false);
			await addGuildMember(discord_id, {
				access_token: accessToken,
				roles: [role.id],
			});
		} else {
			await storeAndAssignRole(redeemLicense);
		}
	} catch (err) {
		console.error(err);
		if (err instanceof RedeemRewardError) {
			throw err;
		}
		throw new Error("Failed to assign role");
	}
};

const isExistGuildMember = async (discordId: string) => {
	try {
		const member = await getGuildMemner(discordId);
		if (member) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
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

const storeAndAssignRole = async (
	redeemLicense: RedeemLicenseDraft,
	assignRole = true,
) => {
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

		if (assignRole) {
			await putGuildMemberRole(
				redeemLicense.discordId,
				redeemLicense.discordGrantRoleId,
			);
		}
	});
};
