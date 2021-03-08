import { css } from "@emotion/css";
import React, { createRef, useEffect } from "react";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import Coin from "./svg/Coin";
import Typography from "./Typography";

type curtainProps = {
  show: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const Curtain = React.forwardRef<HTMLButtonElement, curtainProps & cardProps>(
  ({ show, product, setToCart, setSelected }, ref) => {
    const style = css({
      position: "absolute",
      bottom: 0,
      width: "100%",
      transition: ".3s",
      height: show ? "100%" : 0,
      background: colors.primaryAlpha,
      ...flex("space-evenly", "center", "column"),
      span: {
        ...flex(),
      },
    });

    return (
      <div className={style}>
        {show && (
          <>
            <span>
              <Typography variant="h2" color={colors.fontInverse}>
                {product.cost}
              </Typography>
              <Coin />
            </span>
            <PillButton
              ref={ref}
              onClick={() => setToCart((products) => [...products, product])}
              onBlur={() => setSelected(false)}
              title="Redeem now"
            />
          </>
        )}
      </div>
    );
  }
);
export default Curtain;
