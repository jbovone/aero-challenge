import React, { forwardRef } from "react";
import { css } from "@emotion/css";
import { colors } from "../constants/colors";

interface PillButtonProps {
  onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  title: string;
  active?: boolean;
  disabled?: boolean;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ onClick, onBlur, title, disabled, active }, ref) => {
    const style = css({
      border: `1px solid ${active ? colors.primary : colors.fontSecondary}`,
      color: active ? colors.fontInverse : colors.fontPrimary,
      cursor: "pointer",
      background: active ? colors.primary : colors.fontInverse,
      fontWeight: "bold",
      borderRadius: 20,
      transition: ".5s",
      letterSpacing: 1,
      padding: "1em 2em",
      textTransform: "uppercase",
      transform: active ? "scale(1.1)" : "none",
      ":hover": {
        transform: "scale(1.1)",
        border: `2px solid ${colors.primary}`,
        zIndex: 1000,
      },
      ":focus": {
        transform: "scale(1.1)",
        border: `2px solid ${colors.primary}`,
      },
    });
    return (
      <button
        type="button"
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
