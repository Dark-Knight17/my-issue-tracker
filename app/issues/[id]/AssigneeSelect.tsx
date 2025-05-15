"use client";
import { Skeleton, SkeletonTheme } from "@/app/components";
import useUsers from "@/app/hooks/useUsers";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading)
    return (
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    );
  if (error) return null;
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions</Select.Label>
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
