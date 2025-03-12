"use client";
import { useParams, useSearchParams } from "next/navigation";
import { products } from "@/app/tempData/Products";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import Star from "@/public/star.svg";
import PromoBg from "@/public/promo-bg.png";
import { motion } from "motion/react";
import { productType } from "@/app/types/Products";
import Image from "next/image";

const page = () => {
  const data = useParams();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const [currentImage, setCurrentImage] = useState<string>("");
  const id: number = parseInt(searchParams.get("id") || "0");
  const product: productType = products.filter((data) => data.id === id)[0];

  useEffect(() => {
    setCurrentImage(product.image[0]);
  }, [product]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <div className="w-full relative">
            {currentImage && (
              <Image
                src={currentImage}
                className="w-full aspect-[3/2]"
                width={200}
                height={150}
                alt="img"
              />
            )}
            {product?.discountPercent && (
              <motion.div
                className="absolute top-0 right-1"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[16px] font-bold">
                  {product.discountPercent.toFixed(0)}%
                </span>
                <Image src={PromoBg} alt="discount" width={80} height={100} />
              </motion.div>
            )}
          </div>
          <div className="w-full flex gap-3 overflow-auto hide-scrollbar justify-center">
            {product.image.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={200}
                height={100}
                alt="img"
                onClick={() => setCurrentImage(img)}
                className="cursor-pointer w-[12rem] h-[5rem] "
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[1.5rem] font-bold">{product.name.toUpperCase()}</span>
          <div className="flex gap-2 ">
            <div className="bg-green-400 w-fit text-sm px-1 rounded-sm shadow-sm flex items-center">
              <Image src={Star} alt="rating star" width={10} height={10} className="w-fit" />
              <span className="h-fit">{product.ratings}</span>
            </div>
            <span className="text-[#757575]">{product.reviewsCount} Reviews</span>
          </div>

          {product?.discountPercent ? (
            <div className="flex gap-1">
              <span className="text-[2rem] font-[900]" style={{ color: theme.primary }}>
                Rs.{(product.price - product.price * (product.discountPercent / 100)).toFixed(2)}
              </span>
              <span
                className="text-[1.5rem] mt-1 line-through h-full"
                style={{ color: theme.mainText }}
              >
                Rs.{(product.price * (product.discountPercent / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-[2rem] font-[900]" style={{ color: theme.primary }}>
              Rs.{product.price.toFixed(2)}
            </span>
          )}

          <div className="text-[#757575]">{product.description}</div>

          <button className="w-fit bg-black text-xl text-white rounded-tr-2xl rounded-bl-2xl px-4 py-2">
            Add to Cart
          </button>
        </div>
      </div>
      <div
        className="seperator my-2"
        style={{ borderBottom: "1px solid", borderBottomColor: theme.primary }}
      ></div>
    </div>
  );
};

export default page;
