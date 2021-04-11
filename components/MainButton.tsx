import { css } from "@emotion/css";
import React, { ButtonHTMLAttributes } from "react";
import { colors } from "../constants/colors";
import Button from "./normalizers/Button";
import Typography from "./Typography";

interface MainButtonProps {
  title?: string;
  variant?: "outlined" | "filled";
  color?: keyof typeof colors;
}

const MainButton: React.FC<
  MainButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  title,
  variant = "filled",
  color = "fontPrimary",
  onClick,
  children,
}) => {
  const variants = {
    outlined: {
      border: `2px solid ${colors[color]}`,
    },
    filled: {
      background: colors[color],
      p: {
        color: colors.fontInverse,
      },
    },
  };
  const style = css({
    padding: "1.2em 2.2em",
    borderRadius: 6,
    cursor: "pointer",
    ...variants[variant],
  });
  return (
    <Button className={style} onClick={onClick}>
      <Typography
        variant="h4"
        color={variant === "filled" ? "fontInverse" : color}
        cssProps={{ margin: 0 }} //any normalization criteria shoudn't apply here
      >
        {title}
        {children}
      </Typography>
    </Button>
  );
};
export default MainButton;
