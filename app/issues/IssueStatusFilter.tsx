"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const statuses: {
    label: string;
    value?: Status;
  }[] = [
    { label: "open", value: "OPEN" },
    { label: "in progress", value: "IN_PROGRESS" },
    { label: "closed", value: "CLOSED" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams(searchParams);
        const currentOrderBy = searchParams.get("orderBy");

        if (status == "all") params.delete("status");
        else params.set("status", status);

        if (currentOrderBy) params.set("orderBy", currentOrderBy);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/${query}`);
      }}
      // defaultValue={searchParams.get("status") || "all"}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Item value="all">All</Select.Item>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status, index) => (
            <Select.Item key={index} value={status.value || "all"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
