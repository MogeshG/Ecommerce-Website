import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Developed by Mogesh G",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

