import styled, { CSSObject } from "@emotion/styled";
import { flex } from "../utils/flex";
import { boxShadow } from "../constants/boxShadow";

const Box = styled.section(({ cssProps }: { cssProps?: CSSObject }) => ({
  flex: 1,
  maxWidth: 800,
  background: "white",
  ...flex("space-evenly", "center", "column"),
  boxShadow: boxShadow,
  margin: "10px 15px",
  padding: "8em 1em",
  "h2, p": {
    textAlign: "center",
    marginBottom: "1em",
  },
  ...cssProps,
}));

export default Box;
