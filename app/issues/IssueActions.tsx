"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="mb-3">
      <Button>
        <Link href="/issues/new">new issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
