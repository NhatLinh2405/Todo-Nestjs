interface IOptions {
	day: "2-digit";
	month: "2-digit";
	year: "numeric";
	hour: "numeric";
	minute: "numeric";
	second: "numeric";
	hour12: true;
}

export function convertTime(dateString: string) {
	const date = new Date(dateString);

	const options: IOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric", // Update the year property to "2-digit"
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	};

	return date.toLocaleString("en-GB", options);
}
