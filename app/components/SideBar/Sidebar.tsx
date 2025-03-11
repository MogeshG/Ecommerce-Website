"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="p-4 ">
      <ul>
        <li className="py-2 ">
          <Link href="/">HOME</Link>
        </li>

        <li className="py-2">
          <Link href="/products">Products</Link>
        </li>

        <li className="py-2">
          <Link href="/cart">Cart</Link>
        </li>

        <li className="py-2">
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
