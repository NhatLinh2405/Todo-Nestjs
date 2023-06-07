"use client";

import Button from "@/components/buttons/Button";
import InputField from "@/components/inputs/InputField";
import { addTodo, deleteTodo, getTodoIncomplete, updateComplete } from "@/redux/actions/todoAction";
import { selectTodos } from "@/redux/reducers/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertTime } from "@/utils/covertTime";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
	title: string;
};

export default function Active() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTodoIncomplete());
	}, [dispatch]);

	const sTodos = useAppSelector(selectTodos);

	const onSubmit: SubmitHandler<FormData> = async ({ title }) => {
		try {
			await dispatch(addTodo(title));
		} catch (error) {
			console.log(error);
		}
	};

	async function handleMarkAsCompleted(id: string) {
		try {
			await dispatch(updateComplete(id)).unwrap();
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDeleteTodo(id: string) {
		try {
			await dispatch(deleteTodo(id)).unwrap();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="my-5 flex-center">
			<div className="w-[600px]">
				<form className="" onSubmit={handleSubmit(onSubmit)}>
					<InputField
						name="title"
						label="Title"
						placeholder="Title"
						register={register}
						option={{
							required: "This field is required",
						}}
						error={errors.title?.message as string}
					/>
					<div className="pt-5 flex-center">
						<Button
							className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
							type="submit"
							name="Save"
						/>
					</div>
				</form>

				<div className="space-y-5 mt-14">
					{sTodos.incompleted.map((todo, index) => (
						<div
							key={index}
							className="justify-between px-5 py-6 bg-white border-double shadow-2xl border-x-8 border-sky-500 rounded-2xl flex-center-y"
						>
							<div className="">
								<h3 className="text-lg font-bold">{todo.title}</h3>
								<p className="text-lg">{convertTime(todo.createdAt)}</p>
							</div>
							<div className="flex space-x-5">
								<Button
									className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
									type="submit"
									name="Completed"
									onClick={() => handleMarkAsCompleted(todo.id)}
								/>
								<Button
									className="px-5 py-3 text-white bg-sky-500 hover:bg-sky-600"
									type="submit"
									name="Delete"
									onClick={() => handleDeleteTodo(todo.id)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
