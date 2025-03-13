"use client";
import React from "react";
import { productType } from "../types/Products";
import Confetti from "@/public/confetti.svg";
import PromoBg from "@/public/promo-bg.png";
import { motion } from "motion/react";
import Image from "next/image";
import ArrowHead from "@/public/right-arrow-head.svg";
import Arrow from "@/public/right-arrow.svg";
import { useTheme } from "../context/ThemeContext";
import { useCartAnimation, useCartIcon } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useCartList } from "../context/cartListContext";

const Card = ({ item }: { item: productType }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { cartList, setCartList } = useCartList();
  const { setAnimationProps, setImageUrl, setIsAnimating } = useCartAnimation();
  const cartIconRef = useCartIcon();

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>, item: productType) => {
    if (!cartIconRef?.current) return;
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    const buttonRect = target.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const distance = Math.sqrt((cartRect.x - buttonRect.x) ** 2 + (cartRect.y - buttonRect.y) ** 2);
    const duration = Math.min(Math.max(distance / 1000, 0.5), 2);

    setIsAnimating({ x: buttonRect.left + window.scrollX, y: buttonRect.top + window.scrollY });
    setAnimationProps({ x: cartRect.left, y: cartRect.top, duration: duration });
    setImageUrl(item.image[0]);

    setTimeout(() => {
      setIsAnimating({ x: 0, y: 0 });
      setAnimationProps({ x: 0, y: 0 });
      setCartList((prev) => [...prev, { ...item, count: 1, user_id: "" }]);
    }, duration * 1000 || 800);
  };

  const RedirectToProducts = (item: productType) => {
    router.push(`/products/${item.category}/?name=${item.name}&id=${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl min-w-[150px] relative items-center p-4 shadow-xl flex flex-col justify-between  max-w-[300px]"
      onClick={() => RedirectToProducts(item)}
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
          src={item.image[0]}
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
              <span
                className="text-[10px] mt-1 line-through h-full"
                style={{ color: theme.mainText }}
              >
                Rs.{(item.price * (item.discountPercent / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-[20px] font-[900]" style={{ color: theme.primary }}>
              Rs.{item.price.toFixed(2)}
            </span>
          )}
        </div>
        {cartList.filter((itm) => itm.id === item.id).length > 0 ? (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: theme.primary }}
            className="shadow-md flex cursor-pointer content-center text-white rounded-full px-3 py-1 gap-1"
          >
            Item added to Cart
            <Image src={Confetti} width={10} height={10} alt="confetti-icon" className="w-4" />
          </div>
        ) : (
          <motion.div
            whileHover="cart_hover"
            onClick={(e) => handleAddToCart(e, item)}
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
        )}
      </div>
    </div>
  );
};

export default Card;
