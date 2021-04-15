import { css } from "@emotion/react";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

const style = css({
  border: "none",
  background: "none",
  cursor: "pointer",
  outline: "none",
  margin: 0,
  padding: 0,
});
const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button css={style} ref={ref} {...props}>
      {props.children}
    </button>
  );
});
export default Button;
