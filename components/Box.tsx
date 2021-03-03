import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants/colors";

interface BoxProps {
  shadow: 1 | 2 | 3;
  size?: number;
  tag: keyof JSX.IntrinsicElements;
}

const Box: React.FC<BoxProps> = ({ tag = "div", shadow, size, children }) => {
  const shadowMap = {
    1: `1px 1px 5px 1px ${colors.grayScales[1]}`,
    2: `1px 1px 5px 1px ${colors.grayScales[1]}`,
    3: `1px 1px 5px 1px ${colors.grayScales[1]}`,
  };

  const Content = styled
    .div({
      boxShadow: shadowMap[shadow],
      height: size,
      width: size,
    })
    .withComponent(tag);

  return <Content>{children}</Content>;
};
export default Box;
