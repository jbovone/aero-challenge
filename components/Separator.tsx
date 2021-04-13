import React from "react";
import { colors } from "../constants/colors";
import { css } from "@emotion/css";

interface separatorProps {
  mb?: number;
  mt?: number;
  scale?: 2;
  width?: string;
}

const Separator: React.FC<separatorProps> = ({ mb, mt, scale, width }) => {
  const style = css({
    width: width ? width : "80%",
    height: scale ? scale : "1px",
    margin: "0 auto",
    marginBottom: mb ? mb : ".9em",
    marginTop: mt ? mt : ".9em",
    background: colors.fontSecondary,
  });

  return <div className={style} />;
};
export default Separator;
