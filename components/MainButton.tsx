import { css, cx } from "@emotion/css";
import React, { ButtonHTMLAttributes } from "react";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
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
  className,
  children,
  ...props
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
    ...flex("space-between"),
    ...variants[variant],
  });
  return (
    <Button className={cx(style, className)} onClick={onClick} {...props}>
      <Typography
        variant="h4"
        color={variant === "filled" ? "fontInverse" : color}
        cssProps={{ margin: 0 }} //any normalization criteria shoudn't apply here
      >
        {title}
      </Typography>
      {children}
    </Button>
  );
};
export default MainButton;
