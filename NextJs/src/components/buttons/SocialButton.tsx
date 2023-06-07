import { IconType } from "react-icons";

interface ISocialButton {
	onClick: () => void;
	Icon: IconType;
}

export default function AuthSocialButton({ onClick, Icon }: ISocialButton) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="gap-5 p-2.5 transition-colors bg-white border-2 border-gray-300 rounded-full shadow-xl flex-center hover:border-gray-400"
		>
			<Icon className="text-3xl" />
		</button>
	);
}
