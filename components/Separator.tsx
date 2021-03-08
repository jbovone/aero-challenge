import React from "react";
import { colors } from "../constants/colors";
import { css } from "@emotion/css";

const style = css({
  width: "80%",
  border: "solid 0.1px" + colors.boxShadow,
  margin: "0 auto",
  marginBottom: 25,
});

const Separator: React.FC<{}> = ({}) => {
  return <hr className={style} />;
};
export default Separator;
