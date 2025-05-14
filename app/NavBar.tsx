"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
    <nav
      className={`${robotoMono.variable} font-mono flex  mb-5 h-14 items-center space-x-6 px-5 border-b`}
    >
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            className={classNames({
              "text-zinc-100": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "hover:text-white transition-colors": true,
              "font-bold": true,
            })}
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
