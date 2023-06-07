"use client";
import { getProfile } from "@/redux/actions/userAction";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

function FakePage() {
	const isSendRequest = useRef<boolean>(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage?.getItem("token");
		!token && router.push("/");
		const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

		async function getData() {
			await wait(2000);
			if (token) {
				await dispatch(getProfile());

				isSendRequest.current = true;
			}
		}
		!isSendRequest.current && getData();
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	return <div></div>;
}

export default React.memo(FakePage);
