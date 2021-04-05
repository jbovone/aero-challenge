import { CSSObject } from "@emotion/css";

type col = "column" | "row" | "column-reverse" | "row-reverse";

export const flex = (
  justify?: string,
  align?: string,
  direction?: col
): CSSObject => {
  return {
    display: "flex",
    justifyContent: justify || "center",
    alignItems: align || "center",
    flexDirection: direction || "row",
  };
};

export const wrap = (justify?: string, align?: string): CSSObject => {
  return {
    flexFlow: "wrap",
    justifyItems: justify || "center",
    alignContent: align || "center",
  };
};
