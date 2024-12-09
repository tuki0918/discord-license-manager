"use client";

import { LicenseCodeSchema } from "@/components/LicenseForm";
import SignInButton from "@/components/SignInButton";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
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
import { SITE_NAME } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { redeemReward } from "@/usecases/forms/redeemReward";
import { env } from "@/utils/dotenv.public";
import { handleErrorWithLoading } from "@/utils/errorHandler";
import { Link } from "@/utils/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	code: LicenseCodeSchema,
});

export default function RedeemRewardForm({
	isLoggedIn,
}: {
	isLoggedIn: boolean;
}) {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const handleError = useCallback(
		handleErrorWithLoading(toast, setIsLoading),
		[],
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: code ?? "",
		},
	});

	const onSubmit = useCallback(
		async (values: z.infer<typeof formSchema>) => {
			await handleError(
				async () => {
					await redeemReward(values);
					form.reset({ code: "" });
				},
				(toast) => {
					toast({
						title: "Congratulations!",
						description: `Redeemed: ${values.code}`,
						action: (
							<Link
								href={env.NEXT_PUBLIC_DISCORD_INVITE_URL}
								target="_blank"
								className={buttonVariants({
									variant: "outline",
								})}
							>
								<Icons.discord className="w-4 h-4" />
								Join
							</Link>
						),
					});
				},
			);
		},
		[handleError, form],
	);

	return (
		<Card className="w-[460px]">
			<CardHeader>
				<CardTitle className="text-center text-xl m-2">{SITE_NAME}</CardTitle>
				<CardDescription className="text-center">
					{isLoggedIn
						? "Please enter your license key to claim your reward."
						: "Please sign in to claim your reward."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
											{...field}
											className="min-w-96"
											disabled={!isLoggedIn}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-center">
							<Button type="submit" disabled={!isLoggedIn || isLoading}>
								{isLoading && <LoaderCircle className="animate-spin" />}
								Verify Code
							</Button>
						</div>
					</form>
				</Form>
				{!isLoggedIn && <RedeemRewardSignInForm />}
			</CardContent>
		</Card>
	);
}

export function RedeemRewardSignInForm() {
	return (
		<div>
			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Connect To
					</span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<SignInButton />
			</div>
		</div>
	);
}
