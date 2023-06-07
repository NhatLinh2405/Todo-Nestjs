import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IProps {
	name: string;
	label: string;
	type?: string;
	placeholder: string;
	disabled?: boolean;
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	error?: string;
}

export default function InputField({
	name,
	label,
	type = "text",
	placeholder,
	disabled = false,
	register,
	option,
	error,
}: IProps) {
	return (
		<div className={`${error ? "h-[90px]" : "h-[75px]"}`}>
			<div className="relative flex flex-col gap-1 py-2 rounded-lg">
				<label className="pl-2" htmlFor={name}>
					<span className="text-sm font-medium leading-6 text-gray-900 ">{label}</span>
					<span className={option?.required ? "text-rose-500" : "hidden"}>*</span>
				</label>
				<input
					id={label}
					className={`w-full rounded-lg py-2 px-3 shadow-md border-2 border-gray-400 outline-none focus:border-sky-600 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
						disabled && "opacity-50 cursor-default"
					} 
          ${error && "border-rose-500"} 
            `}
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					{...register(name, { ...option })}
				/>
			</div>
			<p className={error ? "pl-2 text-red-500" : "hidden"}>{error}</p>
		</div>
	);
}
