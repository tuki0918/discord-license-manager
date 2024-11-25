import type { formSchema as licenseFormSchema } from "@/components/LicenseForm";
import type { z } from "zod";

export const storeItem = async (
	id: string | null,
	values: z.infer<typeof licenseFormSchema>,
) => {
	//
};

export const deleteItem = async (id: string) => {
	//
};
