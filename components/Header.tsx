import { css, CSSInterpolation } from "@emotion/css";
import Image from "next/image";
import Typography from "./Typography";
import React from "react";
import { colors } from "../constants/colors";
import { mediaQuery } from "../utils/media";

const style: CSSInterpolation = css({
  width: "100%",
  height: "45vw",
  maxHeight: "45vh",
  background: `url("/images/header-x11-min.png") no-repeat right ${colors.primary}`,
  backgroundSize: "contain",
  position: "relative",
  h1: {
    position: "absolute",
    bottom: "4vw",
    left: "4vw",
  },
  ...mediaQuery(740, {
    h1: {
      fontSize: "4rem" /*use case specific in principle*/,
    },
  }),
});

const Header: React.FC<{}> = ({}) => {
  return (
    <header className={style}>
      <Typography variant="h1" color={colors.fontInverse}>
        Electronics
      </Typography>
    </header>
  );
};
export default Header;
