"use client";

import { useSidebar } from "@/app/context/SideBarContext";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import Header from "../Header/Header";
import { CartContext, useCartAnimation } from "@/app/context/CartContext";
import { useTheme } from "@/app/context/ThemeContext";
import { useRef } from "react";
import CartSvg from "@/public/cart.svg";
import Image from "next/image";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebar();
  const { theme } = useTheme();
  const { imageUrl, isAnimating, animationProps } = useCartAnimation();
  const cartIconRef = useRef<HTMLDivElement>(null);

  const Cart = () => (
    <div ref={cartIconRef} className="relative">
      <Image src={CartSvg} className="cursor-pointer" alt="cart-logo" />
    </div>
  );

  return (
    <CartContext.Provider value={cartIconRef}>
      <div
        className="flex min-h-screen h-[300vh] relative"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        {isAnimating.x !== 0 && animationProps.x !== 0 && (
          <motion.img
            src={imageUrl}
            alt="Product"
            className="absolute w-16 h-16 object-cover z-50"
            initial={{ x: isAnimating.x, y: isAnimating.y, scale: 1, opacity: 1 }}
            animate={{
              x: animationProps.x - 20,
              y: animationProps.y - 20,
              scale: 0.2,
              opacity: 0.2,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
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

        <div className="flex flex-col flex-1 w-full">
          <Header Cart={Cart} />

          <motion.aside
            initial={{ minHeight: "0rem" }}
            animate={{
              height: sidebarOpen ? "fit-content" : 0,
              minHeight: sidebarOpen ? "15rem" : "0rem",
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
    </CartContext.Provider>
  );
}
