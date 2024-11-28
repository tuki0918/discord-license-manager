"use server";

import type { formSchema as redeemLicenseFormSchema } from "@/components/RedeemLicenseForm";
import { RedeemLicenseDraft } from "@/domain/models";
import prisma from "@/libs/db";
import type { z } from "zod";

export const storeItem = async (
	id: number | null,
	values: z.infer<typeof redeemLicenseFormSchema>,
) => {
	try {
		const redeemLicense = RedeemLicenseDraft.create(values);
		if (id) {
			await prisma.redeemLicense.update({
				data: redeemLicense.toDB(),
				where: { id },
			});
		} else {
			await prisma.redeemLicense.create({
				data: redeemLicense.toDB(),
			});
		}
	} catch (err) {
		console.error(err);
		throw new Error("Failed to store item");
	}
};

export const deleteItem = async (id: number) => {
	try {
		await prisma.redeemLicense.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		console.error(err);
		throw new Error("Failed to delete item");
	}
};
