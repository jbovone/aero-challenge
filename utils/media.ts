import { CSSInterpolation, CSSObject } from "@emotion/css";

export function mediaQuery(breakpoint: number, css: CSSObject): CSSObject {
  const media = `@media (max-width:${breakpoint}px)`;
  return {
    [media]: { ...css },
  };
}
