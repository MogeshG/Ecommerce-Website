"use client";
import React from "react";
import { useCartList } from "@/app/context/cartListContext";
import { cartType } from "@/app/types/Products";
import CartCard from "@/app/components/CartCard";
import EmptyCart from "@/public/empty-cart-ipack.webp";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";

const page = () => {
  const { cartList }: { cartList: cartType[] } = useCartList();
  const {theme} = useTheme();

  if (cartList.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <Image src={EmptyCart} width={400} height={400} alt="empty-cart-icon" />
        <span className="text-2xl text-[#585858] font-bold">Your cart is Empty</span>
        <Link href="/products">
        <button className="mt-3 px-4 py-2 rounded-full text-white text-xl" style={{backgroundColor: theme.primary}}>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-2">
      {cartList.map((item) => (
        <CartCard key={item.id} cartItem={item} />
      ))}
    </div>
  );
};

export default page;
