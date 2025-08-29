import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { Providers } from "@/components/wrappers/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScalePadi for Experts",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} lg:w-[1440px] lg:max-w-[1440px] lg:mx-auto w-screen`}>
        <Toaster richColors />
        <Providers>
          <div className="flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
