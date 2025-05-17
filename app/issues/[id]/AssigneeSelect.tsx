"use client";
import { Skeleton, SkeletonTheme } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 60min
    retry: 3,
  });

export default AssigneeSelect;
