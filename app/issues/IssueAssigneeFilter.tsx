import { Select } from "@radix-ui/themes";
import React, { useState } from "react";
import { useUsers } from "./_hooks/useUsers";
import { Skeleton, SkeletonTheme } from "../components";
import { useRouter, useSearchParams } from "next/navigation";

const IssueAssigneeFilter = () => {
  const { data: users, error, isLoading } = useUsers();

  const router = useRouter();
  const searchParams = useSearchParams();
  if (isLoading)
    return (
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    );
  if (error) return null;

  return (
    <Select.Root
      onValueChange={(assignee) => {
        const params = new URLSearchParams(searchParams);
        if (assignee === "all") params.delete("assignee");
        else params.set("assignee", assignee);
        const query = "?" + params.toString();
        router.push(query);
      }}
      defaultValue={searchParams.get("assignee") || "all"}
    >
      <Select.Trigger placeholder="Filter by Assignee..." />
      <Select.Content>
        <Select.Item key={1} value="all">
          All
        </Select.Item>
        <Select.Item key={2} value="unassigned">
          Unassigned
        </Select.Item>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Assignee</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id!}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
