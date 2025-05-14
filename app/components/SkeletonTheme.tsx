import { ReactNode } from "react";
import { SkeletonTheme as Theme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTheme = ({ children }: { children: ReactNode }) => {
  return (
    <Theme baseColor="#000" highlightColor="#444">
      {children}
    </Theme>
  );
};

export default SkeletonTheme;
