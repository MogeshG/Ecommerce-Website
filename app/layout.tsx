import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "./context/SideBarContext";
import SidebarLayout from "./components/SideBar/SideBarLayout";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Developed by Mogesh G",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="advent-pro select-none">
        <ThemeProvider>
          <SidebarProvider>
            <SidebarLayout>
              <main className="flex-1">{children}</main>
            </SidebarLayout>
            <Footer />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

