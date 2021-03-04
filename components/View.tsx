import React from "react";
import { css, CSSObject, cx } from "@emotion/css";
import { SerializedStyles } from "@emotion/react";

interface viewProps {
  cssProps?: CSSObject;
}

const View: React.FC<viewProps> = ({ children, cssProps }) => {
  const style = css({
    minHeight: "100vh",
    width: "100%",
    ...cssProps,
  });
  console.log(style);

  return <main className={style}>{children}</main>;
};
export default View;
