"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

const Breadcrumb = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-2">
      <ul className="flex gap-2">
        <li>
          <Link href="/" className=" hover:underline" style={{ color: theme.primary }}>
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-400">{segment}</span>
              ) : (
                <Link href={href} className="hover:underline" style={{ color: theme.primary }}>
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
