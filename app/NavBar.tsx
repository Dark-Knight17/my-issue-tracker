"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { Skeleton, SkeletonTheme } from "./components";

const NavBar = () => {
  return (
    <nav className={`mb-5 px-5 py-3 border-b`}>
      <Flex justify="between">
        <Flex align="center" gap="8">
          <Link href="/">
            <FaBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <SkeletonTheme>
        <Skeleton width="3rem" />
      </SkeletonTheme>
    );
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">signin</Link>;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">signout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
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
  );
};

export default NavBar;
