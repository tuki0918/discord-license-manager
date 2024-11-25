import type { Prisma } from "@prisma/client";
import { z } from "zod";

const RedeemLicenseStatusSchema = z.enum(["enable", "disabled"]);
const RedeemLicenseSchema = z.object({
	id: z.number(),
	code: z.string().min(16, {
		message: "Code must be at least 16 characters.",
	}),
	redeemed_at: z.date(),
	status: RedeemLicenseStatusSchema,
	discord_id: z.string(),
	discord_grant_role_id: z.string(),
});

const RedeemLicenseDraftSchema = RedeemLicenseSchema.omit({ id: true });

export type RedeemLicenseStatusType = z.infer<typeof RedeemLicenseStatusSchema>;
export type RedeemLicenseDraftType = z.infer<typeof RedeemLicenseDraftSchema>;
export type RedeemLicenseType = z.infer<typeof RedeemLicenseSchema>;

export class RedeemLicenseDraft {
	readonly code: string;
	readonly status: RedeemLicenseStatusType;
	readonly redeemedAt: Date;
	readonly discordId: string;
	readonly discordGrantRoleId: string;

	protected constructor(data: RedeemLicenseDraftType) {
		this.code = data.code;
		this.status = data.status;
		this.redeemedAt = data.redeemed_at;
		this.discordId = data.discord_id;
		this.discordGrantRoleId = data.discord_grant_role_id;
	}

	static create(data: RedeemLicenseDraftType): RedeemLicenseDraft {
		const validatedData = RedeemLicenseDraftSchema.parse(data);
		return new RedeemLicenseDraft(validatedData);
	}

	isEnable(): boolean {
		return this.status === "enable";
	}

	toDB(): Prisma.RedeemLicenseUncheckedCreateInput {
		return {
			code: this.code,
			redeemed_at: this.redeemedAt,
			status: this.status,
			discord_id: this.discordId,
			discord_grant_role_id: this.discordGrantRoleId,
		};
	}
}

export class RedeemLicense extends RedeemLicenseDraft {
	readonly id: number;

	private constructor(data: RedeemLicenseType) {
		super(data);
		this.id = data.id;
	}

	static create(data: RedeemLicenseType): RedeemLicense {
		const validatedData = RedeemLicenseSchema.parse(data);
		return new RedeemLicense(validatedData);
	}

	isEqual(other: RedeemLicense): boolean {
		return this.id === other.id;
	}
}
