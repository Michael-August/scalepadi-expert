"use client";

import DashboardNav from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import Protected from "@/components/wrappers/Protected";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Protected>
			<main className="flex flex-col lg:w-[1440px] lg:max-w-[1440px] lg:mx-auto w-screen">
				<DashboardNav />
				{children}
				<Footer />
			</main>
		</Protected>
	);
}
