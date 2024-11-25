"use server";

import type { formSchema as licenseFormSchema } from "@/components/LicenseForm";
import { LicenseDraft } from "@/domain/models";
import prisma from "@/libs/db";
import type { z } from "zod";

export const storeItem = async (
	id: number | null,
	values: z.infer<typeof licenseFormSchema>,
) => {
	try {
		const license = LicenseDraft.create(values);
		if (id) {
			await prisma.license.update({
				data: license.toDB(),
				where: { id },
			});
		} else {
			await prisma.license.create({
				data: license.toDB(),
			});
		}
	} catch (err) {
		console.error(err);
		throw new Error("Failed to store item");
	}
};

export const deleteItem = async (id: number) => {
	try {
		await prisma.license.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		console.error(err);
		throw new Error("Failed to delete item");
	}
};
