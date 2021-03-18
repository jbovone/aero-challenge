import React from "react";
import { colors } from "../constants/colors";
import { css } from "@emotion/css";

interface separatorProps {
  mb?: number;
  mt?: number;
}

const Separator: React.FC<separatorProps> = ({ mb, mt }) => {
  const style = css({
    width: "80%",
    height: "1px",
    margin: "0 auto",
    marginBottom: mb ? mb : ".9em",
    marginTop: mt ? mt : ".9em",
    background: colors.fontSecondary,
  });

  return <div className={style} />;
};
export default Separator;
