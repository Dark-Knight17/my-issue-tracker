import { Table } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";
import LoadingSkeleton from "./LoadingSkeleton";

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
                <LoadingSkeleton />
                <div className="block md:hidden">
                  <LoadingSkeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LoadingSkeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LoadingSkeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
