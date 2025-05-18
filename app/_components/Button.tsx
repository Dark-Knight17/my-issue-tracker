'use client'
import { Button as RadixButton } from "@radix-ui/themes";
import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
  return <RadixButton>{children}</RadixButton>;
};

export default Button;
