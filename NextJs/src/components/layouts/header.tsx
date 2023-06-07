"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import Navigation from "../navbar/Navigation";

export default function Header() {
	const router = useRouter();
	const handleLogOut = () => {
		console.log(1);
		localStorage.removeItem("token");
		router.push("/");
	};
	return (
		<header className="justify-between px-10 py-3 bg-purple-400 flex-center-y">
			<div className="flex-center">
				<Link href="/">
					<Image src="/images/logo.png" alt="logo" width={60} height={60} />
				</Link>
				<Navigation />
			</div>
			<Button onClick={handleLogOut} className="" type="button" name="Log out" />
		</header>
	);
}
