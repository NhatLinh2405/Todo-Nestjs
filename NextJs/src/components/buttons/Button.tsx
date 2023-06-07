import { IButton } from "@/types/interfaces";

export default function Button({ className, name, Icon, onClick, disabled, type }: IButton) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`${className} cursor-pointer outline-none border-none font-semibold flex-center shadow-lg tracking-wider hover:scale-105 lg:hover:scale-100 rounded-2xl`}
		>
			{Icon && <Icon className={`${className} mr-3 text-4xl transition-none sm:mr-1 sm:text-3xl`} />}
			<p>{name}</p>
		</button>
	);
}
