"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type LoaderType = {
  loaderVisible: boolean;
  toggleLoader: (val: boolean) => void;
};

const LoaderContext = createContext<LoaderType | null>(null);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  const toggleLoader = (val: boolean) => setLoaderVisible(val);

  return (
    <LoaderContext.Provider value={{ loaderVisible, toggleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must use within Loader Provider");
  }
  return context;
};
