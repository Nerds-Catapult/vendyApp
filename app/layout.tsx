import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/fragments/navbar";
import Footer from "@/components/fragments/footer";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Vendy Marketplace",
  description: "Vendy Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-right" />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
