import React, { forwardRef } from "react";
import { css } from "@emotion/css";
import { colors } from "../constants/colors";

interface PillButtonProps {
  onClick: (event: React.SyntheticEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  title: string;
  rounding?: number;
  disabled?: boolean;
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

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ onClick, onBlur, title, disabled, rounding }, ref) => {
    return (
      <button
        disabled={disabled}
        ref={ref}
        className={style}
        onBlur={onBlur}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
);
export default PillButton;
