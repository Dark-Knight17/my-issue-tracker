import SkeletonTheme from "@/app/components/SkeletonTheme";
import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
