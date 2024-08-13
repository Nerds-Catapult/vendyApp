"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/fragments/navbar";
import Footer from "@/components/fragments/footer";
import { AuthProvider } from "@/context/auth-context";

import { store } from "@/app/store/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider store={store}>
            <Toaster position="top-right" />
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </body>
      </html>
    </AuthProvider>
  );
}
