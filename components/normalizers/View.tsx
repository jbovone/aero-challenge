import React from "react";
import { css, CSSObject } from "@emotion/react";

interface viewProps {
  cssProps?: CSSObject;
}

const View: React.FC<viewProps> = ({ children, cssProps }) => {
  const style = css({
    minHeight: "55vh",
    width: "100%",
    ...cssProps,
  });
  return <main css={style}>{children}</main>;
};
export default View;
