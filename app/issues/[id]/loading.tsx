import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonTheme from "../../components/SkeletonTheme";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
      <Flex gap="3" my="2">
        <SkeletonTheme>
          <Skeleton width="5rem" />
        </SkeletonTheme>

        <SkeletonTheme>
          <Skeleton width="8rem" />
        </SkeletonTheme>
      </Flex>
      <Card className="prose dark:prose-invert" mt="6">
        <SkeletonTheme>
          <Skeleton count={3} />
        </SkeletonTheme>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
