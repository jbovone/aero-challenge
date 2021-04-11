import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { css } from "@emotion/css";
import { colors } from "../constants/colors";
import Button from "./normalizers/Button";

interface PillButtonProps {
  title: string;
  active?: boolean;
}

const PillButton = forwardRef<
  HTMLButtonElement,
  PillButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, onBlur, title, disabled, active, ...props }, ref) => {
  const style = css({
    border: `1px solid ${active ? colors.primary : colors.fontSecondary}`,
    color: active ? colors.fontInverse : colors.fontPrimary,
    background: active ? colors.primary : colors.fontInverse,
    fontWeight: "bold",
    borderRadius: 20,
    transition: ".5s",
    letterSpacing: 1,
    padding: "1em 2em",
    margin: 8,
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
    <Button
      type="button"
      disabled={disabled}
      ref={ref}
      className={style}
      onBlur={onBlur}
      onClick={onClick}
      {...props}
    >
      {title}
    </Button>
  );
});
export default PillButton;
