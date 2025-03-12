"use client";
import React, { useState } from "react";
import { productType } from "../types/Products";
import PromoBg from "@/public/promo-bg.png";
import { motion } from "motion/react";
import Image from "next/image";
import ArrowHead from "@/public/right-arrow-head.svg";
import Arrow from "@/public/right-arrow.svg";
import { useTheme } from "../context/ThemeContext";
import { useCartAnimation, useCartIcon } from "../context/CartContext";

const Card = ({ item }: { item: productType }) => {
  const { theme } = useTheme();
  const { setAnimationProps, setImageUrl, setIsAnimating } = useCartAnimation();
  const cartIconRef = useCartIcon();

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
    if (!cartIconRef?.current) return;
    const target = e.target as HTMLDivElement;
    const buttonRect = target.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const deltaX = cartRect.left - buttonRect.left;
    const deltaY = cartRect.top - buttonRect.top;

    console.log(deltaX, deltaY, cartRect.left, cartRect.top, buttonRect.left, buttonRect.top);

    setIsAnimating({ x: buttonRect.left, y: buttonRect.top });
    setAnimationProps({ x: cartRect.left, y: cartRect.top });
    setImageUrl(url);

    setTimeout(() => {
      setIsAnimating({ x: 0, y: 0 });
      setAnimationProps({ x: 0, y: 0 });
    }, 800);
  };

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl min-w-[150px] relative items-center p-4 shadow-xl flex flex-col justify-between aspect-[10/12] w-full "
    >
      {item?.discountPercent && (
        <motion.div
          className="absolute top-0 right-1"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[13px] font-bold">
            {item.discountPercent.toFixed(0)}%
          </span>
          <Image src={PromoBg} alt="discount" width={60} height={100} />
        </motion.div>
      )}
      <div className="image-container aspect-square min-h-[40%] w-full">
        <Image
          src={item.image}
          width={200}
          height={150}
          alt={item.name}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>
      <div className="content w-full flex flex-col items-start">
        <span className="text-[25px] font-bold leading-none">{item.name}</span>
        <span className="text-sm text-[#6e6e6e] h-10 w-full overflow-hidden text-ellipsis line-clamp-2">
          {item.description}
        </span>
      </div>
      <div className="quantity w-full flex justify-between flex-col">
        <div className="content-start">
          {item?.discountPercent ? (
            <div className="flex gap-1">
              <span className="text-[20px] font-[900]" style={{ color: theme.primary }}>
                Rs.{(item.price - item.price * (item.discountPercent / 100)).toFixed(2)}
              </span>
              <span className="text-[10px] mt-1 line-through h-full" style={{ color: theme.mainText }}>
                Rs.{(item.price * (item.discountPercent / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-[20px] font-[900]" style={{ color: theme.primary }}>
              Rs.{item.price.toFixed(2)}
            </span>
          )}
        </div>
        <motion.div
          whileHover="cart_hover"
          onClick={(e) => handleAddToCart(e, item.image)}
          className="bg-black shadow-md flex cursor-pointer content-center text-white rounded-full px-3 py-1 justify-between"
        >
          <span className="h-full content-center">Add to cart</span>
          <div className="flex gap-0 relative w-10 h-full overflow-hidden">
            <motion.span
              initial={{ opacity: 1 }}
              variants={{
                cart_hover: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } },
              }}
              className="absolute right-0"
            >
              <Image src={ArrowHead} width={20} className="w-full" alt="Arrow Head" />
            </motion.span>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              variants={{
                cart_hover: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.2, ease: "easeInOut" },
                },
              }}
              className="absolute right-0 flex items-center justify-center origin-center overflow-hidden"
            >
              <Image src={Arrow} width={20} className="w-full" alt="Arrow" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
