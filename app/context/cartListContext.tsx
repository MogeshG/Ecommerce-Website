"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { cartType } from "../types/Products";

type cartProvider = {
  cartList: cartType[];
  setCartList: Dispatch<SetStateAction<cartType[]>>;
  addProductCount: (id: string) => void;
  reduceProductCount: (id: string) => void;
  removeProduct: (id: string) => void;
};
export const CartListContext = createContext<cartProvider | null>(null);

export const CartListProvider = ({ children }: { children: ReactNode }) => {
  const [cartList, setCartList] = useState<cartType[]>([]);

  const addProductCount = (id: string) => {
    const updatedCartList = cartList.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );

    setCartList(updatedCartList);
  };

  const reduceProductCount = (id: string) => {
    const updatedCartList = cartList.reduce((acc: cartType[], item: cartType) => {
      if (item.id === id) {
        if (item.count > 1) acc.push({ ...item, count: item.count - 1 });
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setCartList(updatedCartList);
  };

  const removeProduct = (id: string) => {
    const updatedCartList = cartList.filter((item) => item.id !== id);

    setCartList(updatedCartList);
  };

  return (
    <CartListContext.Provider
      value={{ cartList, setCartList, addProductCount, reduceProductCount, removeProduct }}
    >
      {children}
    </CartListContext.Provider>
  );
};

export const useCartList = () => {
  const context = useContext(CartListContext);
  if (!context) {
    throw new Error("Cart List must be used inside Cart List Provider");
  }
  return context;
};
