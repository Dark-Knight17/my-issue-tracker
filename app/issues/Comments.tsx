import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Flex, Box, Separator, Text, Card, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import CommentCard from "./CommentCard";

const Comments = async ({ issue }: { issue: Issue }) => {
  const comments = await prisma.comment.findMany({
    where: {
      issueId: issue.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <Card>
      <Heading>Comments</Heading>
      <Flex direction="column" gap="3" mt="3">
        {comments.map((comment) => (
          <CommentCard
            comment={comment.comment}
            authorName={comment.author.name!}
          />
        ))}
      </Flex>
    </Card>
  );
};

export default Comments;
