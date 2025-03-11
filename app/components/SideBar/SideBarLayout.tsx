"use client";

import { useSidebar } from "@/app/context/SideBarContext";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import Header from "../Header/Header";
import { useTheme } from "@/app/context/ThemeContext";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebar();
  const { theme } = useTheme();

  return (
    <div className="flex h-screen" style={{ backgroundColor: theme.backgroundColor }}>
      <motion.aside
        initial={{ width: "0rem", opacity: 1 }}
        animate={{
          width: sidebarOpen ? "15rem" : "0rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full overflow-hidden md:block hidden"
        style={{
          backgroundColor: theme.mainText,
          color: theme.secondaryText,
        }}
      >
        {sidebarOpen && <Sidebar />}
      </motion.aside>

      <div className="flex flex-col flex-1">
        <Header />

        <motion.aside
          initial={{ height: "0rem" }}
          animate={{
            height: sidebarOpen ? "15rem" : "0rem",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden absolute top-16 left-0 w-full text-white z-50 overflow-hidden"
          style={{
            backgroundColor: theme.mainText,
            color: theme.secondaryText,
          }}
        >
          {sidebarOpen && <Sidebar />}
        </motion.aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
