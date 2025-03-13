"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useCartList } from "../context/cartListContext";

const CountButton = ({ id, count }: { id: string; count: number }) => {
  const { theme } = useTheme();
  const { reduceProductCount, addProductCount } = useCartList();
  return (
    <div className="flex">
      <button
        className="w-fit text-xl text-white rounded-l-full px-4 py-1 border-2 hover:bg-red-600"
        style={{ borderColor: theme.primary, backgroundColor: theme.mainText }}
        onClick={() => reduceProductCount(id)}
      >
        -
      </button>
      <span
        className="px-4 py-1 text-xl text-white h-fit w-[3rem] text-center border-y-2"
        style={{ borderColor: theme.primary, backgroundColor: theme.mainText }}
      >
        {count}
      </span>
      <button
        className="w-fit text-xl text-white rounded-r-full px-4 py-1 border-2 !hover:bg-green-600"
        style={{ borderColor: theme.primary, backgroundColor: theme.mainText }}
        onClick={() => addProductCount(id)}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
