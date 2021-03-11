import React from "react";
import { colors } from "../constants/colors";
import { css } from "@emotion/css";

interface separatorProps {
  mb?: number;
}

const Separator: React.FC<separatorProps> = ({ mb }) => {
  const style = css({
    width: "80%",
    height: "1px",
    margin: "0 auto",
    marginBottom: mb ? mb : ".9em",
    background: colors.fontSecondary,
  });

  return <div className={style} />;
};
export default Separator;
