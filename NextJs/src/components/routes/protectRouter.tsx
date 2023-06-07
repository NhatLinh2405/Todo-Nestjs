"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
	children: React.ReactNode;
	isToken?: boolean;
}

export default function ProtectRoute({ children, isToken }: IProps) {
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/");
		}
	}, [router]);

	return <div className="">{children}</div>;
}
