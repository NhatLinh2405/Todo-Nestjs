import FakePage from "@/components/FakePage";
import Header from "@/components/layouts/header";
import ProtectRoute from "@/components/routes/protectRouter";
import { Providers } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
	title: "Messenger",
	description: "Messenger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<html lang="en" suppressHydrationWarning={true}>
				<body suppressHydrationWarning={true}>
					<Providers>
						<FakePage />
						<Header />
						<ProtectRoute>{children}</ProtectRoute>
					</Providers>
					<Toaster
						position="top-center"
						reverseOrder={true}
						toastOptions={{
							style: {
								maxWidth: "80%",
							},
						}}
					/>
				</body>
			</html>
		</>
	);
}
