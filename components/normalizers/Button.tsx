import { css, cx } from "@emotion/css";
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
    <button ref={ref} {...props} className={cx(style, props.className)}>
      {props.children}
    </button>
  );
});
export default Button;
