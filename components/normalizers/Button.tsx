import { css } from "@emotion/css";
import React, { MouseEvent } from "react";

interface ButtonProps {
  onClick?: any;
  onBlur?: any;
  onFocus?: any;
}

const style = css({
  border: "none",
  background: "none",
  cursor: "pointer",
  outline: "none",
});
const Button: React.FC<ButtonProps> = ({
  onClick,
  onBlur,
  onFocus,
  children,
}) => {
  return (
    <button
      className={style}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </button>
  );
};
export default Button;
