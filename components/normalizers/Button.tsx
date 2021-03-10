import { css } from "@emotion/css";
import React, { MouseEvent, FocusEvent } from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
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
  disabled,
  children,
}) => {
  return (
    <button
      className={style}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
