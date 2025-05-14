import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#000" highlightColor="#444">
      <Skeleton />
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;
