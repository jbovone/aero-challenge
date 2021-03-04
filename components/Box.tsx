import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants/colors";
import { CSSInterpolation, CSSObject } from "@emotion/css";

interface BoxProps {
  shadow: 1 | 2 | 3;
  tag: keyof JSX.IntrinsicElements;
  cssProps?: CSSObject;
  onClick: any;
}

const Box: React.FC<BoxProps> = ({
  tag = "div",
  shadow,
  children,
  cssProps,
  onClick,
}) => {
  const shadowMap = {
    1: `1px 1px 5px 1px ${colors.boxShadow}`,
    2: `1px 1px 5px 1px ${colors.boxShadow}`,
    3: `1px 1px 5px 1px ${colors.boxShadow}`,
  };

  const Content = styled
    .div({
      boxShadow: shadowMap[shadow],
      ...cssProps,
    })
    .withComponent(tag);

  return <Content onClick={onClick}>{children}</Content>;
};
export default Box;
