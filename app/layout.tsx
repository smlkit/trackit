import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TRACKIT",
  description: "Project managment app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <UserProvider>
            <main className="main-container">{children}</main>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
