import { css } from "@emotion/css";
import React from "react";
import { colors } from "../constants/colors";

interface TypographyProps {
  variant?: "h1" | "h2" | "p" | "small";
  color?: string;
  bold?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  color = colors.fontPrimary,
  bold,
  children,
}) => {
  const styleCase = {
    h1: {
      fontSize: "6.4rem",
      fontWeight: 900,
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: bold ? 900 : 400,
    },
    p: {
      fontSize: "1.8rem",
      fontWeight: bold ? 900 : 400,
    },
    small: {
      fontSize: "1.3rem",
      fontWeight: bold ? 600 : 400,
    },
  };

  const style = css({
    fontFamily: "'Source Sans Pro', sans-serif",
    color: color,
    textAlign: "start",
    ...styleCase[variant],
  });

  const Components = {
    h1: <h1 className={style}>{children}</h1>,
    h2: <h2 className={style}>{children}</h2>,
    h3: <h3 className={style}>{children}</h3>,
    p: <p className={style}>{children}</p>,
    small: <small className={style}>{children}</small>,
  };

  return Components[variant];
};
Typography.defaultProps = {
  variant: "p",
  color: colors.fontPrimary,
};
export default Typography;
