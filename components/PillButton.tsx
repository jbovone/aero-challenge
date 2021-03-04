import React from "react";
import { css } from "@emotion/css";
import { colors } from "../constants/colors";

interface PillButtonProps {
  onClick: Function;
  title: string;
}

const style = css({
  border: `1px solid ${colors.fontSecondary}`,
  color: colors.fontPrimary,
  cursor: "pointer",
  background: "white",
  fontWeight: "bold",
  borderRadius: 20,
  transition: ".5s",
  letterSpacing: 1,
  padding: "0.75em 2.5em",
  textTransform: "uppercase",
  ":hover": {
    transform: "scale(1.1)",
    border: `2px solid ${colors.primary}`,
  },
  ":focus": {
    transform: "scale(1.1)",
    border: `2px solid ${colors.primary}`,
  },
});

const PillButton: React.FC<PillButtonProps> = ({ onClick, title }) => {
  return <button className={style}>{title}</button>;
};
export default PillButton;
