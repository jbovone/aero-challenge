import { css, CSSInterpolation, CSSObject } from "@emotion/css";
import React, { useState, useRef, useEffect, createRef } from "react";
import Typography from "./Typography";
import { colors } from "../constants/colors";
import Bag from "./svg/Bag";
import { flex } from "../utils/flex";
import Coin from "./svg/Coin";
import Curtain from "./Curtain";
import Separator from "./Separator";
import Button from "./normalizers/Button";
import { boxShadow } from "../constants/boxShadow";

const Card: React.FC<cardProps> = ({ ...props }) => {
  const [selected, setSelected] = useState(false);
  const ref = createRef<HTMLButtonElement>();
  const { product, setRedeem } = props;

  const style: CSSInterpolation = css({
    width: "100%",
    "&>*": {
      width: "100%",
    },
    button: {
      margin: "0",
    },

    boxShadow: boxShadow,
    position: "relative",
    transition: ".3s",
    transform: selected ? "scale(1.2)" : "none",
    zIndex: selected ? 100 : 99,
    order: props.order,
    header: {
      ...flex("space-between"),
      div: {
        ...flex(),
      },
    },

    img: {
      width: "95%",
    },
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [selected]);
  return (
    <article className={style}>
      <Button
        onClick={() => setSelected(true)}
        onFocus={() => setSelected(true)}
      >
        <header>
          <Bag />
          <div>
            <Typography color={colors.fontSecondary}>{product.cost}</Typography>
            <Coin />
          </div>
        </header>
        <img src={"/images/products/Nintendo3DS-x1.png"} />
        <Separator />
        <Typography color={colors.fontSecondary}>{product.category}</Typography>
        <Typography>{product.name}</Typography>
      </Button>
      <Curtain
        ref={ref}
        show={selected}
        product={product}
        setRedeem={setRedeem}
        setSelected={setSelected}
      />
    </article>
  );
};
export default Card;
