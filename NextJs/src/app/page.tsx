import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex-col min-h-screen bg-gray-100 flex-center-x sm:px-6 lg:px-8 bg">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image height="48" width="48" className="w-auto mx-auto" src="/images/logo.png" alt="Logo" />
				<h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Welcome</h2>
			</div>
			<AuthForm />
		</div>
	);
}
