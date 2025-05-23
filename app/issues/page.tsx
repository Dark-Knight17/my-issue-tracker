import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../_components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}
const IssuesPage = async (props: Props) => {
  const searchParams = await props.searchParams;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const assigneeParam = searchParams.assignee;
  const assignedToUserId =
    assigneeParam === "unassigned" ? null : assigneeParam || undefined;

  const where = { status, assignedToUserId };

  const validSorts = ["asc", "desc"] as const;
  const sort = validSorts.includes(searchParams.sort)
    ? searchParams.sort
    : "asc";

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sort }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker -Issue List",
  description: "View all project issues",
};
