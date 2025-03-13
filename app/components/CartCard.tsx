"use client";
import React from "react";
import { cartType } from "../types/Products";
import Star from "@/public/star.svg";
import Image from "next/image";
import Bin from "@/public/bin.svg";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { useCartList } from "../context/cartListContext";
import CountButton from "./CountButton";

const CartCard = ({ cartItem }: { cartItem: cartType }) => {
  const { theme } = useTheme();
  const { removeProduct } = useCartList();

  return (
    <div className="relative w-full grid md:grid-cols-[20%_60%] grid-cols-[30%_70%] gap-2 bg-white p-4 rounded-md shadow-md">
      <div className="w-fit">
        <Link href={`/products/${cartItem.category}?name=${cartItem.name}&id=${cartItem.id}`}>
          <Image
            src={cartItem.image[0]}
            width={150}
            height={400}
            alt={cartItem.name}
            className=" w-[600px] aspect-square rounded-md min-w-[80px]"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <span className="text-[1.2rem] font-bold">{cartItem.name.toUpperCase()}</span>
          {cartItem.discountPercent && (
            <p className="text-red-500 font-bold underline decoration-double">
              {" "}
              -{cartItem.discountPercent}%
            </p>
          )}
        </div>
        <div className="flex gap-2 ">
          <div className="bg-green-400 w-fit text-sm px-1 rounded-sm shadow-sm flex items-center">
            <Image src={Star} alt="rating star" width={10} height={10} className="w-fit" />
            <span className="h-fit">{cartItem.ratings}</span>
          </div>
          <span className="text-[#757575]">{cartItem.reviewsCount} Reviews</span>
        </div>

        {cartItem?.discountPercent ? (
          <div className="flex gap-1">
            <span className="text-[1.5rem] font-[900]" style={{ color: theme.primary }}>
              Rs.{(cartItem.price - cartItem.price * (cartItem.discountPercent / 100)).toFixed(2)}
            </span>
            <span
              className="text-[1rem] mt-1 line-through h-full"
              style={{ color: theme.mainText }}
            >
              Rs.{(cartItem.price * (cartItem.discountPercent / 100)).toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-[2rem] font-[900]" style={{ color: theme.primary }}>
            Rs.{cartItem.price.toFixed(2)}
          </span>
        )}

        <div className="text-[#757575] line-clamp-3 h-[4.5rem] min-h-fit text-ellipsis">
          {cartItem.description}
        </div>
        <CountButton id={cartItem.id} count={cartItem.count} />
      </div>
      <button className="absolute top-2 right-2" onClick={() => removeProduct(cartItem.id)}>
        <Image src={Bin} width={30} height={100} alt="Remove Item" />
      </button>
    </div>
  );
};

export default CartCard;
