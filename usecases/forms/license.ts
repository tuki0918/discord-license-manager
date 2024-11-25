import type { formSchema as storeItemFormSchema } from "@/components/LicenseForm";
import type { z } from "zod";

export const storeItem = async (
	id: string | null,
	values: z.infer<typeof storeItemFormSchema>,
) => {
	//
};

export const deleteItem = async (id: string) => {
	//
};
