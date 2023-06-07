"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavbar {
	name: string;
	role: string;
	href: string;
}

const navLinks: INavbar[] = [
	{
		name: "Active",
		role: "user",
		href: "/active",
	},
	{
		name: "Completed",
		role: "user",
		href: "/completed",
	},
	{
		name: "Users",
		role: "admin",
		href: "/admin/users",
	},
];

export default function Navigation() {
	const pathname = usePathname();

	return (
		<div className="ml-20 space-x-14 flex-center-y">
			{navLinks.map((link) => {
				const isActive = pathname?.startsWith(link.href);

				return (
					<Link
						className={`${
							isActive ? "text-yellow-300" : "text-white"
						} text-xl font-bold  hover:text-green-400`}
						href={link.href}
						key={link.name}
					>
						{link.name}
					</Link>
				);
			})}
		</div>
	);
}
