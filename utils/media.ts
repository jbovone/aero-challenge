import { CSSObject } from "@emotion/css";

export function media(breakpoint: number, css: CSSObject): CSSObject {
  const media = `@media (max-width:${breakpoint}px)`;
  return {
    [media]: { ...css },
  };
}
