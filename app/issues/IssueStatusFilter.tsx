"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        const currentOrderBy = searchParams.get("orderBy");

        if (status == "all") params.delete("status");
        else params.append("status", status);

        if (currentOrderBy) params.append("orderBy", currentOrderBy);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/${query}`);
      }}
      defaultValue={searchParams.get("status") || "all"}
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
