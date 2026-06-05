import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rang Utsav Designer | Premium Women's Ethnic Fashion Store",
  description: "Rang Utsav Designer - Premium Indian boutique presenting designer women's suits, royal saris, heavy bridal lehengas, and chic modern co-ord sets. Handcrafted elegance in every weave.",
  keywords: "women clothing, designer suits, silk sari, lehenga choli, co-ord sets, bridal wear, ethnic wear, Rang Utsav Designer, boutique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50`}
      >
        {children}
      </body>
    </html>
  );
}
