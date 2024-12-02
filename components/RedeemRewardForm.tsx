"use client";

import { LicenseCodeSchema } from "@/components/LicenseForm";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { redeemReward } from "@/usecases/forms/redeemReward";
import { handleErrorWithLoading } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import type { Session } from "next-auth";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	code: LicenseCodeSchema,
	discord_id: z.string().min(1, {
		message: "You must be logged in.",
	}),
});

export default function RedeemRewardForm({
	user,
}: { user: Session["user"] | undefined }) {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const handleError = useCallback(
		handleErrorWithLoading(toast, setIsLoading),
		[],
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: "",
			discord_id: user?.uid ?? "",
		},
	});

	const onSubmit = useCallback(
		async (values: z.infer<typeof formSchema>) => {
			await handleError(
				async () => {
					await redeemReward(values);
				},
				(toast) => {
					toast({
						title: "Success",
						description: `Item created: ${values.code}`,
					});
				},
			);
		},
		[handleError],
	);

	if (!user) {
		return (
			<Card className="w-[420px]">
				<CardHeader>
					<CardTitle className="text-center text-xl m-2">XXX</CardTitle>
					<CardDescription className="text-center">XXX</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center">
					<SignInButton />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-[420px]">
			<CardHeader>
				<CardTitle className="text-center text-xl m-2">XXX</CardTitle>
				<CardDescription className="text-center">XXX</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>コード</FormLabel>
									<FormControl>
										<Input
											placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
											{...field}
											className="min-w-96"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="discord_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="hidden" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-center">
							<Button type="submit" disabled={isLoading}>
								{isLoading && <LoaderCircle className="animate-spin" />}
								XXX
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
