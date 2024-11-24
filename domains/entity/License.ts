import type { Prisma } from "@prisma/client";
import { z } from "zod";

// format: XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX
const pattern = /^[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}$/;
const LicenseCodeSchema = z.string().regex(pattern, {
	message: "Invalid format. Expected XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX",
});
const LicenseStatusSchema = z.enum(["enable", "disabled"]);
const LicenseSchema = z.object({
	id: z.number(),
	name: z.string(),
	code: LicenseCodeSchema,
	status: LicenseStatusSchema,
	expired_at: z.date(),
	discord_grant_role_id: z.string(),
});

const LicenseDraftSchema = LicenseSchema.omit({ id: true });

export type LicenseStatusType = z.infer<typeof LicenseStatusSchema>;
export type LicenseDraftType = z.infer<typeof LicenseDraftSchema>;
export type LicenseType = z.infer<typeof LicenseSchema>;

export class LicenseDraft {
	readonly name: string;
	readonly code: string;
	readonly status: LicenseStatusType;
	readonly expiredAt: Date;
	readonly discordGrantRoleId: string;

	protected constructor(data: LicenseDraftType) {
		this.name = data.name;
		this.code = data.code;
		this.status = data.status;
		this.expiredAt = data.expired_at;
		this.discordGrantRoleId = data.discord_grant_role_id;
	}

	static create(data: LicenseDraftType): LicenseDraft {
		const validatedData = LicenseDraftSchema.parse(data);
		return new LicenseDraft(validatedData);
	}

	isEnable(): boolean {
		return this.status === "enable";
	}

	isExpired(date: Date = new Date()): boolean {
		return this.expiredAt < date;
	}

	toDB(): Prisma.LicenseUncheckedCreateInput {
		return {
			name: this.name,
			code: this.code,
			expired_at: this.expiredAt,
			status: this.status,
			discord_grant_role_id: this.discordGrantRoleId,
		};
	}
}

export class License extends LicenseDraft {
	readonly id: number;

	private constructor(data: LicenseType) {
		super(data);
		this.id = data.id;
	}

	static create(data: LicenseType): License {
		const validatedData = LicenseSchema.parse(data);
		return new License(validatedData);
	}

	isEqual(other: License): boolean {
		return this.id === other.id;
	}
}
