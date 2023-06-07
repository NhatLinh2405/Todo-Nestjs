type TypeButton = "button" | "submit" | "reset";

export interface IButton {
	className: string;
	name: string;
	Icon?: JSX.Element | React.ElementType | any;
	onClick?: () => void;
	disabled?: boolean;
	type: TypeButton;
}
