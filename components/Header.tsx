import { css, SerializedStyles } from "@emotion/react";
import Typography from "./Typography";
import React from "react";
import { colors } from "../constants/colors";
import { media } from "../utils/media";

const style: SerializedStyles = css({
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
  ...media(740, {
    h1: {
      fontSize: "4rem" /*use case specific in principle*/,
    },
  }),
});

const Header: React.FC<{}> = ({}) => {
  return (
    <header css={style}>
      <Typography variant="h1" color="fontInverse">
        Electronics
      </Typography>
    </header>
  );
};
export default Header;
