import Pagination from "./components/Pagination";
import LastestIssues from "./LastestIssues";

export default async function Home(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParams = await props.searchParams;
  return <LastestIssues />;
}
