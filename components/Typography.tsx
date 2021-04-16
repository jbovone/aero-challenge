import { css, CSSObject, SerializedStyles } from "@emotion/react";
import React from "react";
import { colors } from "../constants/colors";

type align = "start" | "left" | "right" | "center";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small";
  color?: colors;
  bold?: boolean;
  align?: align;
  cssProps?: CSSObject;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  color,
  bold,
  align,
  cssProps,
  children,
}) => {
  const styleCase = {
    h1: {
      fontSize: "6rem",
      fontWeight: 900,
    },
    h2: {
      fontSize: "4.4rem",
      fontWeight: bold ? 900 : 400,
    },
    h3: {
      fontSize: "3.1rem",
      fontWeight: bold ? 900 : 400,
    },
    h4: {
      fontSize: "2.2rem",
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

  const style: SerializedStyles = css({
    fontFamily: "'Source Sans Pro', sans-serif",
    color: color ? colors[color] : colors.fontPrimary,
    textAlign: align ? align : "start",
    ...styleCase[variant],
    ...cssProps,
  });

  const Components = {
    h1: <h1 css={style}>{children}</h1>,
    h2: <h2 css={style}>{children}</h2>,
    h3: <h3 css={style}>{children}</h3>,
    h4: <h4 css={style}>{children}</h4>,
    p: <p css={style}>{children}</p>,
    small: <small css={style}>{children}</small>,
  };

  return Components[variant];
};
Typography.defaultProps = {
  variant: "p",
};
export default Typography;
