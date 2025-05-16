"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const statuses: {
    label: string;
    value?: Status;
  }[] = [
    { label: "all" },
    { label: "open", value: "OPEN" },
    { label: "in progress", value: "IN_PROGRESS" },
    { label: "closed", value: "CLOSED" },
  ];

  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "all" ? `?status=${status}` : "";
        router.push(`/issues/${query}`);
      }}
      defaultValue=""
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
