"use client";
import { Skeleton, SkeletonTheme } from "@/app/_components";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useUsers } from "../_hooks/useUsers";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    if (userId !== "unassinged") {
      axios
        .patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId,
          status: "IN_PROGRESS",
        })
        .then(() => router.refresh())
        .catch(() => {
          toast.error("Changes could not be saved");
        });
    }
  };

  if (isLoading)
    return (
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    );
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
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
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
