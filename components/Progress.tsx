import { css, CSSInterpolation } from "@emotion/css";
import { keyframes } from "@emotion/react";
import React, { useEffect } from "react";
import { colors } from "../constants/colors";

interface ProgressProps {
  timmer: number;
  cb?: () => void;
}

const prog = keyframes`
  100% {
    width: 100%
  }
`;

const Progress: React.FC<ProgressProps> = ({ timmer, cb }) => {
  const style: CSSInterpolation = css({
    background: colors.decorators[0],
    height: "10px",
    width: "0%",
    position: "absolute",
    top: 0,
    left: 0,
    boxShadow: `inset 0 2px 6px #fff, inset 0 2px 6px #fff`,
    animation: `${prog} ${timmer}ms ${1}`,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (cb) cb();
    }, timmer);
    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return <div className={style}></div>;
};
export default Progress;
