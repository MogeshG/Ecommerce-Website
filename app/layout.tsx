import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "./context/SideBarContext";
import SidebarLayout from "./components/SideBar/SideBarLayout";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { CartAnimationProvider } from "./context/CartContext";
import { CartListProvider } from "./context/cartListContext";
import Loader from "./components/Loader";
import { LoaderProvider } from "./context/LoaderContext";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Developed by Mogesh G",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="advent-pro select-none">
        <LoaderProvider>
          <Loader />
          <ThemeProvider>
            <CartListProvider>
              <SidebarProvider>
                <CartAnimationProvider>
                  <SidebarLayout>
                    <main className="flex-1">{children}</main>
                  </SidebarLayout>
                </CartAnimationProvider>
                <Footer />
              </SidebarProvider>
            </CartListProvider>
          </ThemeProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}

