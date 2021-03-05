import React from "react";
import { css, CSSObject } from "@emotion/css";

interface viewProps {
  cssProps?: CSSObject;
}

const View: React.FC<viewProps> = ({ children, cssProps }) => {
  const style = css({
    minHeight: "100vh",
    width: "100%",
    ...cssProps,
  });
  return <main className={style}>{children}</main>;
};
export default View;
