import React from "react";
import { colors } from "../constants/colors";
import { css } from "@emotion/css";

const style = css({
  width: "80%",
  height: ".5px",
  margin: "0 auto",
  marginBottom: ".9em",
  background: colors.fontSecondary,
});

const Separator: React.FC<{}> = ({}) => {
  return <div className={style} />;
};
export default Separator;
