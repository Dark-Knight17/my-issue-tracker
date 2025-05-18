import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, TextArea } from "@radix-ui/themes";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";
import { auth } from "@/auth";
import { useQuery } from "@tanstack/react-query";


const Comments = async ({ issue }: { issue: Issue }) => {
  const session = await auth();
  const comments = await prisma.comment.findMany({
    where: {
      issueId: issue.id,
    },
    include: {
      author: true,
    },
  });

  const author = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return (
    <Flex direction="column" gap="2">
      <Card>
        <Heading>Comments</Heading>
        <Flex direction="column" gap="3" mt="3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.comment}
              authorName={comment.author.name!}
            />
          ))}
        </Flex>
      </Card>
      <PostComment issueId={issue.id} authorId={author?.id!} />
    </Flex>
  );
};

export default Comments;
