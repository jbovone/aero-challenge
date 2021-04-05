import { css, CSSObject } from "@emotion/css";
import React from "react";
import { colors } from "../constants/colors";

type align = "start" | "left" | "right" | "center";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "p" | "small";
  color?: string;
  bold?: boolean;
  align?: align;
  cssProps?: CSSObject;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  color = colors.fontPrimary,
  bold,
  align,
  cssProps,
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
    h3: {
      fontSize: "2.1rem",
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
    textAlign: align ? align : "start",
    ...styleCase[variant],
    ...cssProps,
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
