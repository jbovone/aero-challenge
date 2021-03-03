import React from "react";
import { css } from "@emotion/css";

const style = css({
  minHeight: "100vh",
});

const View: React.FC<{}> = ({ children }) => {
  return <main className={style}>{children}</main>;
};
export default View;
