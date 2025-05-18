import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueBUtton from "./DeleteIssueBUtton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import Comments from "../Comments";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);
const IssueDetailPage = async (props: Props) => {
  const session = await auth();
  const params = await props.params;
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Container>
      <Grid
        columns={{
          initial: "1",
          sm: "5",
        }}
        gap="5"
      >
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
          <Box mt="5">
            <Comments issue={issue} />
          </Box>
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="4">
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueBUtton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export async function generateMetadata(prop: Props) {
  const params = await prop.params;
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailPage;
