"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "@/app/context/ThemeContext";

type listItemsType = {
  key: number;
  title: string;
  url: string;
};

export default function Sidebar() {
  const { theme } = useTheme();

  const listItems: listItemsType[] = [
    {
      key: 1,
      title: "Home",
      url: "/",
    },
    {
      key: 2,
      title: "Products",
      url: "/products",
    },
    {
      key: 3,

      title: "Cart",
      url: "/cart",
    },
    {
      key: 4,

      title: "Profile",
      url: "/profile",
    },
  ];

  return (
    <nav className="p-4 ">
      <ul>
        {listItems.map((item) => (
          <motion.li key={item.key} whileHover="hover" className="py-2 w-fit">
            <Link href={item.url}>{item.title}</Link>
            <motion.div
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%" },
              }}
              style={{ backgroundColor: theme.primary }}
              className="w-full h-[3px]"
            ></motion.div>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
