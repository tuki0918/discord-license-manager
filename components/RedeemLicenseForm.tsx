"use client";

import { LicenseCodeSchema } from "@/components/LicenseForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { deleteItem, storeItem } from "@/usecases/forms/redeemLicense";
import { useRouter } from "@/utils/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	code: LicenseCodeSchema,
	redeemed_at: z.date(),
	status: z.enum(["enable", "disabled"]),
	discord_id: z.string().min(2, {
		message: "Discord id must be at least 2 characters.",
	}),
	discord_grant_role_id: z.string().min(2, {
		message: "Role id must be at least 2 characters.",
	}),
});

const RedeemLicenseForm: FC<{
	itemId?: number;
	defaultValues?: Partial<z.infer<typeof formSchema>>;
}> = ({ itemId = null, defaultValues }) => {
	const isCreate = !itemId;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: defaultValues?.code || "",
			redeemed_at: defaultValues?.redeemed_at || new Date(),
			status: defaultValues?.status || "enable",
			discord_id: defaultValues?.discord_id || "",
			discord_grant_role_id: defaultValues?.discord_grant_role_id || "",
		},
	});

	const onSubmit = useCallback(
		async (values: z.infer<typeof formSchema>) => {
			setIsLoading(true);
			await storeItem(itemId, values);
			setIsLoading(false);
			router.push("/x/admin/redeems");
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
			router.push("/x/admin/redeems");
		}
	}, [itemId, router]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input
									placeholder="code"
									{...field}
									className="min-w-96"
									disabled={!isCreate}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="redeemed_at"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Redeemed At</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
											disabled={!isCreate}
										>
											{field.value ? (
												format(field.value, "yyyy/MM/dd HH:mm")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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

				<FormField
					control={form.control}
					name="discord_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Discord id</FormLabel>
							<FormControl>
								<Input
									placeholder="discord id"
									{...field}
									disabled={!isCreate}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="discord_grant_role_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grant role</FormLabel>
							<FormControl>
								<Input placeholder="role id" {...field} disabled={!isCreate} />
							</FormControl>
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
	);
};

export default RedeemLicenseForm;
