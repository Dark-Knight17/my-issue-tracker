import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sort: "asc" | "desc";
  page: string;
  pageSize: string;
  assignee: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sort:
                      searchParams.orderBy === column.value &&
                      searchParams.sort === "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
                className={
                  column.value === searchParams.orderBy
                    ? "text-red-900 font-semibold"
                    : undefined
                }
              >
                {column.label}
              </NextLink>

              {column.value === searchParams.orderBy &&
                (searchParams.sort === "asc" ? (
                  <ArrowUpIcon className="inline text-red-900 " />
                ) : (
                  <ArrowDownIcon className="inline text-red-900 " />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
