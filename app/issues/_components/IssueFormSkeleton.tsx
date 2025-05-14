import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton, SkeletonTheme } from "../../components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme>
        <Skeleton height="2rem" />
        <Skeleton height="20rem" />
      </SkeletonTheme>
    </Box>
  );
};

export default IssueFormSkeleton;
