"use client";
import { Skeleton, SkeletonTheme } from "@/app/components";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading)
    return (
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    );
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
