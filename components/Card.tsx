import { css, CSSInterpolation, CSSObject } from "@emotion/css";
import React, { useState, useRef, useEffect, createRef } from "react";
import { media } from "../utils/media";
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
  const { product, setToCart } = props;

  const style: CSSInterpolation = css({
    margin: 15,
    boxShadow: boxShadow,
    width: "22.3%",
    position: "relative",
    transition: ".3s",
    transform: selected ? "scale(1.2)" : "none",
    zIndex: selected ? 100 : 99,
    "&>*": {
      width: "100%",
    },
    header: {
      ...flex("space-between"),
      div: {
        ...flex(),
      },
    },
    "img, hr": {
      margin: "0 auto",
    },
    img: {
      width: "100%",
    },
    ...media(1130, {
      width: "28%",
    }),
    ...media(720, {
      width: "40%",
    }),
    ...media(460, {
      width: "80%",
    }),
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
        <img src={product.img.url} />
        <Separator />
        <Typography color={colors.fontSecondary}>{product.category}</Typography>
        <Typography>{product.name}</Typography>
      </Button>
      <Curtain
        ref={ref}
        show={selected}
        product={product}
        setToCart={setToCart}
        setSelected={setSelected}
      />
    </article>
  );
};
export default Card;
