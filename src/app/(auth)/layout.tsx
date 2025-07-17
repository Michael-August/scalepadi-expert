import AuthNav from "@/components/auth-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className="flex flex-col lg:w-[1440px] lg:max-w-[1440px] lg:mx-auto w-screen">
                    <AuthNav />
                    {children}
                </main>
            </body>
        </html>
    );
}
