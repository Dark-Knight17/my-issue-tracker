'use client'
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const NewIssueButton = () => {
  return (
    <Button>
      <Link href="/issues/new">new issue</Link>
    </Button>
  );
};

export default NewIssueButton;
