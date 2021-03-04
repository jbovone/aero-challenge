import { css } from "@emotion/css";
import React, { MouseEvent } from "react";

interface ButtonProps {
  onClick?: any;
}

const style = css({
  border: "none",
  background: "none",
  cursor: "pointer",
});
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
