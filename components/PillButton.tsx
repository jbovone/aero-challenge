import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { colors } from "../constants/colors";
import Button from "./normalizers/Button";
import Typography from "./Typography";

interface PillButtonProps {
  title: string;
  active?: boolean;
}

const PillButton = forwardRef<
  HTMLButtonElement,
  PillButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, onBlur, title, disabled, active, ...props }, ref) => {
  const style: SerializedStyles = css({
    border: `1px solid ${active ? colors.primary : colors.fontSecondary}`,
    background: active ? colors.primary : colors.fontInverse,
    borderRadius: 20,
    transition: ".5s",
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
      css={style}
      onBlur={onBlur}
      onClick={onClick}
      {...props}
    >
      <Typography
        bold
        variant="small"
        color={active ? "fontInverse" : "fontPrimary"}
      >
        {title}
      </Typography>
    </Button>
  );
});
export default PillButton;
