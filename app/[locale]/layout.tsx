import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/utils/i18n";
import type { Locale } from "@/utils/i18n";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider>
					<NextIntlClientProvider messages={messages}>
						<div>{children}</div>
						<Toaster />
					</NextIntlClientProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
