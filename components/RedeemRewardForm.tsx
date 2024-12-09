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
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	code: LicenseCodeSchema,
	discord_id: z.string(),
});

export default function RedeemRewardForm({
	isLoggedIn,
	discordId,
}: {
	isLoggedIn: boolean;
	discordId: string | null;
}) {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const t = useTranslations("Components/RedeemRewardForm");
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
			discord_id: discordId ?? "",
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
								{t("toast/join")}
							</Link>
						),
					});
				},
			);
		},
		[handleError, t, form],
	);

	return (
		<Card className="w-[440px]">
			<CardHeader>
				<CardTitle className="text-center text-2xl">{SITE_NAME}</CardTitle>
				<CardDescription className="text-center">
					{isLoggedIn ? t("loggedin/true") : t("loggedin/false")}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{isLoggedIn && (
							<FormField
								control={form.control}
								name="discord_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("form/discord_id")}</FormLabel>
										<FormControl>
											<Input {...field} disabled={true} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("form/code")}</FormLabel>
									<FormControl>
										<Input {...field} disabled={!isLoggedIn} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-center">
							<Button type="submit" disabled={!isLoggedIn || isLoading}>
								{isLoading && <LoaderCircle className="animate-spin" />}
								{t("submit")}
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
	const t = useTranslations("Components/RedeemRewardSignInForm");
	return (
		<div>
			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						{t("separater")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<SignInButton />
			</div>
		</div>
	);
}
