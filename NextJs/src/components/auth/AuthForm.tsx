"use client";
import { signIn, signUp } from "@/redux/actions/userAction";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Button from "../buttons/Button";
import { default as AuthSocialButton } from "../buttons/SocialButton";
import InputField from "../inputs/InputField";

type Variant = "login" | "register";

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function AuthForm() {
	const [variant, setVariant] = useState<Variant>("login");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const dispatch = useAppDispatch();

	const toggleVariant = useCallback(() => {
		setVariant(variant === "login" ? "register" : "login");
	}, [variant]);

	const {
		register,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading(true);
		try {
			variant !== "login" ? dispatch(signUp(data)) : dispatch(signIn(data));
			router.push("/active");
		} catch (error) {
			console.log(error);
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);
		console.log(action);
	};

	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
				<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
					{variant === "register" && (
						<InputField
							name="firstName"
							label="First Name"
							placeholder="Your first name..."
							register={register}
							option={{
								required: "Please enter your first Name",
								minLength: {
									value: 2,
									message: "First Name must be at least 2 characters",
								},
								pattern: {
									value: /^[\p{L}\s]+$/u,
									message: "Please enter a valid name",
								},
							}}
							error={errors.firstName?.message as string}
						/>
					)}
					{variant === "register" && (
						<InputField
							name="lastName"
							label="Last Name"
							placeholder="Your last name..."
							register={register}
							option={{
								required: "Please enter your last name",
								minLength: {
									value: 2,
									message: "Last name must be at least 2 characters",
								},
								pattern: {
									value: /^[\p{L}\s]+$/u,
									message: "Please enter a valid name",
								},
							}}
							error={errors.lastName?.message as string}
						/>
					)}
					<InputField
						name="email"
						label="Email"
						placeholder="Your mail..."
						register={register}
						option={{
							required: "Please enter your email",
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "Please enter a valid email",
							},
						}}
						error={errors.email?.message as string}
					/>
					<InputField
						name="password"
						label="Password"
						placeholder="Your password..."
						type="password"
						register={register}
						option={{
							required: "Please enter your password",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters",
							},
						}}
						error={errors.password?.message as string}
					/>
					{variant === "register" && (
						<InputField
							name="confirmPassword"
							label="Confirm password"
							placeholder="Confirm password..."
							type="password"
							register={register}
							option={{
								required: "Please enter confirm Password",
								validate: (value) => value === getValues("password"),
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
							}}
							error={
								errors.confirmPassword?.type === "validate"
									? "Password does not match"
									: errors.confirmPassword?.message
							}
						/>
					)}
					<div className="pt-5">
						<Button
							className="w-full py-3 text-white bg-sky-500 hover:bg-sky-600"
							name={variant === "login" ? "Login" : "Register"}
							type="submit"
							disabled={isLoading}
						/>
					</div>
				</form>

				<div className="mt-5">
					<div className="relative">
						<div className="absolute inset-0 flex-center-y">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex-center-x">
							<p className="px-2 text-gray-500 bg-white">Other sign in</p>
						</div>
					</div>
				</div>

				<div className="gap-10 mt-6 flex-center">
					<AuthSocialButton onClick={() => socialAction("google")} Icon={FcGoogle} />
					<AuthSocialButton onClick={() => socialAction("github")} Icon={BsGithub} />
				</div>

				<div className="gap-1 px-2 mt-6 text-gray-500 flex-center-x ">
					<p>{variant === "login" ? "Don't have an account?" : "Already have an account?"}</p>
					<p onClick={toggleVariant} className="font-semibold cursor-pointer text-sky-500">
						{variant === "login" ? "Create one." : "Sign in."}
					</p>
				</div>
			</div>
		</div>
	);
}
