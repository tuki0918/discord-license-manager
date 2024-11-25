"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { deleteItem, storeItem } from "@/usecases/forms/license";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	code: z.string(),
	status: z.enum(["enable", "disabled"]),
	expired_at: z.date(),
	discord_grant_role_id: z.string(),
});

const LicenseForm: FC<{
	itemId?: string;
	defaultValues?: Partial<z.infer<typeof formSchema>>;
}> = ({ itemId = null, defaultValues }) => {
	const isCreate = !itemId;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: defaultValues?.name || "No name",
			code: defaultValues?.code || "",
			status: defaultValues?.status || "enable",
			expired_at: defaultValues?.expired_at || new Date(),
		},
	});

	const onSubmit = useCallback(
		async (values: z.infer<typeof formSchema>) => {
			setIsLoading(true);
			await storeItem(itemId, values);
			setIsLoading(false);
			router.push("/dashboard");
		},
		[itemId, router],
	);

	const handleDelete = useCallback(async () => {
		if (!itemId) {
			return;
		}

		// TODO: dialog
		if (confirm("Are you sure you want to delete this item?")) {
			setIsLoadingDelete(true);
			await deleteItem(itemId);
			setIsLoadingDelete(false);
			router.push("/dashboard");
		}
	}, [itemId, router]);

	return (
		<div className="w-4/5 md:w-3/5 lg:w-1/2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Code</FormLabel>
								<FormControl>
									<Input placeholder="code" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a item" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="enable">enable</SelectItem>
										<SelectItem value="disabled">disabled</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex items-center justify-between">
						<Button type="submit" disabled={isLoading}>
							{isLoading && <LoaderCircle className="animate-spin" />}
							{isCreate ? "Create" : "Update"}
						</Button>

						{!isCreate && (
							<Button
								variant="destructive"
								disabled={isLoadingDelete}
								onClick={handleDelete}
							>
								{isLoadingDelete && <LoaderCircle className="animate-spin" />}
								Delete
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LicenseForm;
