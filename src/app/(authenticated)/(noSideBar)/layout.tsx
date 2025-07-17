import DashboardNav from "@/components/dashboard-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className="flex flex-col lg:w-[1440px] lg:max-w-[1440px] lg:mx-auto w-screen">
                    <DashboardNav />
                    {children}
                </main>
            </body>
        </html>
    );
}
