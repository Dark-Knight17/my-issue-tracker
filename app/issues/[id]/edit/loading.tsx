import { Skeleton, SkeletonTheme } from "@/app/components";
import { Box } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme>
        <Skeleton />
        <Skeleton height="20rem" />
      </SkeletonTheme>
    </Box>
  );
};

export default LoadingNewIssuePage;
