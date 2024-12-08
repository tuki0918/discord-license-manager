"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { routing, usePathname, useRouter } from "@/utils/i18n";
import type { Locale } from "@/utils/i18n";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export default function LanguageSelectMenu() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();
	const defaultLocale = routing.locales.includes(locale as Locale)
		? locale
		: routing.defaultLocale;

	const selectLanguage = useCallback(
		(language: Locale) => {
			router.replace(pathname, { locale: language });
		},
		[router, pathname],
	);

	return (
		<Select onValueChange={selectLanguage} defaultValue={defaultLocale}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a Language" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="ja">日本語</SelectItem>
				<SelectItem value="en">English</SelectItem>
			</SelectContent>
		</Select>
	);
}
