"use client";

import { useSidebar } from "@/app/context/SideBarContext";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import Header from "../Header/Header";
import { CartContext, useCartAnimation } from "@/app/context/CartContext";
import { useCartList } from "@/app/context/cartListContext";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useRef } from "react";
import CartSvg from "@/public/cart.svg";
import Image from "next/image";
import BreadCrumbs from "../BreadCrumbs";
import Link from "next/link";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef2 = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const { cartList } = useCartList();
  const { imageUrl, isAnimating, animationProps } = useCartAnimation();
  const cartIconRef = useRef<HTMLDivElement>(null);

  const Cart = () => (
    <div ref={cartIconRef} className="relative">
      {cartList.length > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {cartList.length}
        </span>
      )}
      <Link href="/cart">
        <Image src={CartSvg} className="cursor-pointer" alt="cart-logo" />
      </Link>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarRef2.current &&
        !sidebarRef2.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <CartContext.Provider value={cartIconRef}>
      <div
        className="flex min-h-screen relative"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        {isAnimating.x !== 0 && animationProps.x !== 0 && (
          <motion.img
            src={imageUrl}
            alt="Product"
            className="fixed w-16 h-16 object-cover z-50 "
            initial={{ x: isAnimating.x, y: isAnimating.y - window.scrollY, scale: 1, opacity: 1 }}
            animate={{
              x: animationProps.x - 20,
              y: animationProps.y - 20,
              scale: 0.2,
              opacity: 0.2,
            }}
            transition={{ duration: animationProps.duration || 0.8, ease: "easeOut" }}
          />
        )}
        <motion.aside
          ref={sidebarRef2}
          initial={{ width: "0rem", opacity: 1 }}
          animate={{
            width: sidebarOpen ? "15rem" : "0rem",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className=" overflow-hidden md:block hidden sticky top-0 z-40"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: theme.mainText,
            color: theme.secondaryText,
          }}
        >
          {sidebarOpen && <Sidebar />}
        </motion.aside>

        <div className="flex flex-col flex-1 w-full">
          <Header Cart={Cart} />

          <motion.aside
            ref={sidebarRef}
            initial={{ minHeight: "0rem" }}
            animate={{
              height: sidebarOpen ? "fit-content" : 0,
              minHeight: sidebarOpen ? "15rem" : "0rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden top-16 left-0 w-full text-white z-30 overflow-hidden sticky"
            style={{
              backgroundColor: theme.mainText,
              color: theme.secondaryText,
            }}
          >
            {sidebarOpen && <Sidebar />}
          </motion.aside>
          <main className="flex-1 p-6">
            <BreadCrumbs />
            {children}
          </main>
        </div>
      </div>
    </CartContext.Provider>
  );
}
