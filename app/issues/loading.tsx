import { Skeleton, SkeletonTheme } from "@/app/components";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueActions />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <SkeletonTheme>
                  <Skeleton />
                </SkeletonTheme>
                <div className="block md:hidden">
                  <SkeletonTheme>
                    <Skeleton />
                  </SkeletonTheme>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <SkeletonTheme>
                  <Skeleton />
                </SkeletonTheme>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <SkeletonTheme>
                  <Skeleton />
                </SkeletonTheme>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
