"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import { ThemeConfig, themeType } from "../configs/ThemeConfig";

interface ThemeContextType {
  theme: themeType;
  toggleTheme: (val: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<themeType>(ThemeConfig["light"]);

  const toggleTheme = (val: string) => {
    val === "light" ? setTheme(ThemeConfig["dark"]) : setTheme(ThemeConfig["light"]);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
