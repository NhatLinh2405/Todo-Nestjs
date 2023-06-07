"use client";

import Button from "@/components/buttons/Button";
import { deleteUserByAdmin, getAllUserByAdmin } from "@/redux/actions/adminAction";
import { selectAdmin } from "@/redux/reducers/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertName } from "@/utils/covertName";
import { convertTime } from "@/utils/covertTime";
import { useEffect } from "react";

export default function Users() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllUserByAdmin());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sAdmin = useAppSelector(selectAdmin);

	// async function handleMarkAsCompleted(id: string) {
	// 	try {
	// 		await dispatch(updateComplete(id)).unwrap();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async function handleDeleteTodo(id: string) {
		try {
			await dispatch(deleteUserByAdmin(id)).unwrap();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="my-5 flex-center">
			<div className="w-[600px]">
				<div className="space-y-5 mt-14">
					{sAdmin.users.length ? (
						sAdmin.users.map((user, index) => (
							<div
								key={index}
								className="justify-between px-5 py-6 bg-white border-double shadow-2xl border-x-8 border-sky-500 rounded-2xl flex-center-y"
							>
								<div className="">
									<h3 className="text-lg font-bold">
										{convertName(user.firstName, user.lastName)}
									</h3>
									<p className="text-lg">{convertTime(user.createdAt)}</p>
								</div>
								<div className="flex space-x-5">
									{/* <Button
									className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
									type="submit"
									name="Completed"
									onClick={() => handleMarkAsCompleted(user.id)}
								/> */}
									<Button
										className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
										type="submit"
										name="Delete"
										onClick={() => handleDeleteTodo(user.id)}
									/>
								</div>
							</div>
						))
					) : (
						<>
							<h1>No user</h1>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
