"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/utils/i18n";
import { LogOut, SquareArrowOutUpRight } from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function UserDropdownMenu({
	user,
	isAdmin,
}: { user: User; isAdmin: boolean }) {
	const t = useTranslations("Components/UserDropdownMenu");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarImage src={user.image || ""} alt={user.name || ""} />
						<AvatarFallback>00</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				{isAdmin && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href="/x/admin">
									<SquareArrowOutUpRight />
									<span>{t("menu/console")}</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut />
					{t("menu/logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
