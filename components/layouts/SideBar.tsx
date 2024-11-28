"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Link } from "@/utils/i18n/routing";
import { Key, Users } from "lucide-react";
import type { FC } from "react";

import { usePathname } from "next/navigation";

const SideBar: FC = () => {
	const pathname = usePathname();
	return (
		<div className={cn("pb-12")}>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Menu
					</h2>
					<div className="space-y-1">
						<Link
							href="/x/admin/licenses"
							className={cn(
								buttonVariants({
									variant:
										pathname === "/x/admin/licenses" ? "secondary" : "ghost",
								}),
								"w-full justify-start",
							)}
						>
							<Key /> Licenses
						</Link>
						<Link
							href="/x/admin/redeems"
							className={cn(
								buttonVariants({
									variant:
										pathname === "/x/admin/redeems" ? "secondary" : "ghost",
								}),
								"w-full justify-start",
							)}
						>
							<Users /> Redeems
						</Link>
					</div>
				</div>

				{/*
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Setting
					</h2>
					<div className="space-y-1">
						...
					</div>
				</div>
                */}
			</div>
		</div>
	);
};

export default SideBar;
