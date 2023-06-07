"use client";

import Button from "@/components/buttons/Button";
import { deleteTodo, getTodoComplete } from "@/redux/actions/todoAction";
import { selectTodos } from "@/redux/reducers/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertTime } from "@/utils/covertTime";
import { useEffect } from "react";

export default function Completed() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTodoComplete());
	}, [dispatch]);

	const sTodos = useAppSelector(selectTodos);

	async function handleDeleteTodo(id: string) {
		try {
			await dispatch(deleteTodo(id)).unwrap();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="mx-10 my-5 flex-center">
			<div className="w-[600px]">
				<div className="space-y-5 mt-14">
					{sTodos.completed.map((todo, index) => (
						<div
							key={index}
							className="justify-between px-5 py-6 bg-white border-double shadow-2xl border-x-8 border-sky-500 rounded-2xl flex-center-y"
						>
							<div className="">
								<h3 className="text-lg font-bold">{todo.title}</h3>
								<p className="text-lg">{convertTime(todo.createdAt)}</p>
							</div>
							<Button
								className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
								type="submit"
								name="Delete"
								onClick={() => handleDeleteTodo(todo.id)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
