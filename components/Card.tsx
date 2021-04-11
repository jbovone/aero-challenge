import { css, CSSInterpolation, cx } from "@emotion/css";
import React, { useState, useRef, useEffect } from "react";
import Typography from "./Typography";
import Bag from "./svg/Bag";
import { flex } from "../utils/flex";
import Curtain from "./Curtain";
import Separator from "./Separator";
import Button from "./normalizers/Button";
import { boxShadow } from "../constants/boxShadow";
import { FaCheck } from "react-icons/fa";
import { media } from "../utils/media";

const Card: React.FC<cardProps> = ({
  product,
  points,
  setRedeem,
  redeemed,
  bagged,
}) => {
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const style: CSSInterpolation = css({
    width: "100%",
    height: "100%",
    "&>*": {
      width: "100%",
    },
    button: {
      margin: "0",
    },
    boxShadow: boxShadow,
    paddingBottom: 8,
    position: "relative",
    transition: ".3s",
    transform: selected ? "scale(1.2)" : "none",
    zIndex: selected ? 100 : 99,
    header: {
      ...flex("space-between", "center", "row-reverse"),
      div: {
        "svg:nth-child(1)": {
          marginTop: 9,
          transition: ".8s",
          transform: bagged
            ? " translate(-15px, 20px) scale(1.9)"
            : "scale(1.1)",
        },
        "svg:nth-child(2)": {
          transition: ".8s",
          transform: `translate(-38px, 10px) ${
            bagged ? "scale(2.8)" : " scale(0.1)"
          }`,
        },
      },
    },
    ...media(520, {
      transform: selected ? "scale(1.1)" : "none",
    }),
    img: {
      width: "95%",
    },
  });

  const redeemedStyle: CSSInterpolation = css({
    display: "none",
  });
  const baggedStyle: CSSInterpolation = css({});
  const disabled = redeemed || bagged;

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [selected]);
  return (
    <article
      className={cx(style, {
        [redeemedStyle]: redeemed,
        [baggedStyle]: bagged,
      })}
    >
      <Button
        onClick={() => !disabled && setSelected(true)}
        onFocus={() => !disabled && setSelected(true)}
      >
        <header>
          <div>
            <Bag />
            <FaCheck fill="rgb(69, 221, 69, 0.7)" />
          </div>
        </header>
        <img src={product.img.url} />
        <Separator />
        <Typography color="fontSecondary">{product.category}</Typography>
        <Typography>{product.name}</Typography>
      </Button>
      <Curtain
        ref={ref}
        show={selected}
        product={product}
        setRedeem={setRedeem}
        setSelected={setSelected}
        availableCoins={points}
      />
    </article>
  );
};
export default Card;
