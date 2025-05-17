import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 60min
    retry: 3,
  });