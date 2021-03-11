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
    width: "100%",
    "&>*": {
      width: "100%",
    },
    button: {
      margin: "0",
    },
    overflow: "hidden",
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
    "img, hr": {
      margin: "0 auto",
    },
    "img, header": {
      width: "95%",
    },
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [selected]);
  console.log(
    product.img.url.replace(
      "https://coding-challenge-api.aerolab.co/",
      "/images/products/"
    )
  );
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
        <img src={"/images/products/AcerAspire-x1.png"} />
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
