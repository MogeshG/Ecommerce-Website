"use client";

import { useSidebar } from "@/app/context/SideBarContext";
import { useTheme } from "@/app/context/ThemeContext";
import { motion } from "motion/react";

export default function Header({ Cart }: { Cart: React.ComponentType }) {
  const { toggleSidebar, sidebarOpen } = useSidebar();
  const { theme } = useTheme();

  return (
    <header
      className="text-white p-4 flex justify-between items-center"
      style={{ backgroundColor: theme.primary }}
    >
      <div className="flex gap-6">
        <button className="md:block hidden text-white" onClick={toggleSidebar}>
          <motion.span
            key={sidebarOpen ? "close" : "menu"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            ☰
          </motion.span>
        </button>
        <h1 className="text-xl font-bold">Logo </h1>
      </div>

      <div className="flex justify-between md:w-1/3 w-[80%] min-w-[280px]">
        <ul className="flex gap-4">
          <motion.li whileHover="hover" className="relative cursor-pointer">
            Search
            <motion.div
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ backgroundColor: theme.mainText }}
              className="absolute left-0 bottom-0 h-[3px] w-full origin-left"
            />
          </motion.li>
          <motion.li whileHover="hover" className="relative cursor-pointer">
            Trending
            <motion.div
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ backgroundColor: theme.mainText }}
              className="absolute left-0 bottom-0 h-[3px] w-full origin-left"
            />
          </motion.li>
          <motion.li whileHover="hover" className="relative cursor-pointer ">
            New Items
            <motion.div
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ backgroundColor: theme.mainText }}
              className="absolute left-0 bottom-0 h-[3px] w-full origin-left"
            />
          </motion.li>
        </ul>

        <Cart />
        <button className="md:hidden block text-white" onClick={toggleSidebar}>
          <motion.span
            key={sidebarOpen ? "close" : "menu"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {sidebarOpen ? "X" : "☰"}
          </motion.span>
        </button>
      </div>
    </header>
  );
}
