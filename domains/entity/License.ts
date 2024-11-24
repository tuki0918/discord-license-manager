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
	private _name: string;
	private _code: string;
	private _status: LicenseStatusType;
	private _expiredAt: Date;
	private _discordGrantRoleId: string;

	protected constructor(data: LicenseDraftType) {
		this._name = data.name;
		this._code = data.code;
		this._status = data.status;
		this._expiredAt = data.expired_at;
		this._discordGrantRoleId = data.discord_grant_role_id;
	}

	static create(data: LicenseDraftType): LicenseDraft {
		const validatedData = LicenseDraftSchema.parse(data);
		return new LicenseDraft(validatedData);
	}

	get name(): string {
		return this._name;
	}

	get code(): string {
		return this._code;
	}

	get status(): LicenseStatusType {
		return this._status;
	}

	get expiredAt(): Date {
		return this._expiredAt;
	}

	get discordGrantRoleId(): string {
		return this._discordGrantRoleId;
	}

	setName(name: string) {
		this._name = name;
	}

	setCode(code: string) {
		const validatedData = LicenseCodeSchema.parse(code);
		this._code = validatedData;
	}

	setStatus(status: LicenseStatusType) {
		this._status = status;
	}

	setExpiredAt(expiredAt: Date) {
		this._expiredAt = expiredAt;
	}

	isEnable(): boolean {
		return this._status === "enable";
	}

	isExpired(date: Date = new Date()): boolean {
		return this._expiredAt < date;
	}

	toDB(): Prisma.LicenseUncheckedCreateInput {
		return {
			name: this._name,
			code: this._code,
			expired_at: this._expiredAt,
			status: this._status,
			discord_grant_role_id: this._discordGrantRoleId,
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
