"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type CartRef = null | React.RefObject<null> | React.RefObject<HTMLDivElement>;
type positionType = {
  x: number;
  y: number;
  duration?: number;
};

interface SidebarContextType {
  isAnimating: positionType;
  setIsAnimating: Dispatch<SetStateAction<positionType>>;
  animationProps: positionType;
  setAnimationProps: Dispatch<SetStateAction<positionType>>;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

export const CartContext = createContext<CartRef>(null);
export const CartAnimationContext = createContext<SidebarContextType | null>(null);

export const CartAnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState<positionType>({ x: 0, y: 0 });
  const [animationProps, setAnimationProps] = useState<positionType>({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <CartAnimationContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
        animationProps,
        setAnimationProps,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </CartAnimationContext.Provider>
  );
};

export function useCartIcon() {
  return useContext(CartContext);
}

export function useCartAnimation() {
  const context = useContext(CartAnimationContext);
  if (!context) {
    throw new Error("useCartAnimation must be used within a CartAnimationProvider");
  }
  return context;
}
