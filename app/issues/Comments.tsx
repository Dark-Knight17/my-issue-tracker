"use client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton, SkeletonTheme } from "../_components";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

interface CommentWithAuthor {
  id: string;
  comment: string;
  createdAt: Date;
  author: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

interface Props {
  issueId: number;
  authorId: string;
}

const fetchComments = async (issueId: number) => {
  const res = await axios.get<CommentWithAuthor[]>(
    `/api/issues/${issueId}/comments`
  );
  return res.data;
};

const Comments = ({ issueId, authorId }: Props) => {
  const {
    data: comments,
    error,
    isLoading,
    refetch,
  } = useQuery<CommentWithAuthor[]>({
    queryKey: ["comments"],
    queryFn: () => fetchComments(issueId),
    refetchInterval: 5000, // optional polling every 5s
  });

  if (isLoading) {
    return (
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    );
  }

  if (error) return null;

  return (
    <Flex direction="column" gap="2">
      <Card>
        <Heading>Comments</Heading>
        <Flex direction="column" gap="3" mt="3">
          {comments?.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.comment}
              authorName={comment.author.name!}
            />
          ))}
        </Flex>
      </Card>
      <PostComment issueId={issueId} authorId={authorId} onSuccess={refetch} />
    </Flex>
  );
};

export default Comments;
