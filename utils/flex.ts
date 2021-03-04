import { CSSObject } from "@emotion/css";

type col = "column";

export const flex = (
  justify?: string,
  align?: string,
  column?: col
): CSSObject => {
  return {
    display: "flex",
    justifyContent: justify || "center",
    alignItems: align || "center",
    flexDirection: column || "row",
  };
};

export const wrap = (justify?: string, align?: string): CSSObject => {
  return {
    flexFlow: "wrap",
    justifyItems: justify || "center",
    alignContent: align || "center",
  };
};
