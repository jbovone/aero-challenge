import { css, CSSInterpolation } from "@emotion/css";
import React, { useState } from "react";
import { media } from "../utils/media";
import Typography from "./Typography";
import { colors } from "../constants/colors";
import Bag from "./svg/Bag";
import { flex } from "../utils/flex";
import Coin from "./svg/Coin";
import Curtain from "./Curtain";

const Card: React.FC<Card> = ({ setToChart, ...props }) => {
  const [selected, setSelected] = useState(false);
  const padd = 10;

  const style: CSSInterpolation = css({
    margin: 15,
    boxShadow: `1px 1px 5px 1px ${colors.boxShadow}`,
    outline: "none",
    overflow: "hidden",
    width: "22.3%",
    background: "white",
    transition: ".3s",
    transform: selected ? "scale(1.2)" : "none",
    zIndex: selected ? 100 : 99,
    border: "none",
    cursor: "pointer",
    position: "relative",
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
    hr: {
      width: "80%",
      border: "solid 0.1px" + colors.boxShadow,
      marginBottom: 20,
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

  return (
    <button
      className={style}
      onClick={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onFocus={() => setSelected(true)}
      onKeyPress={(e) => {
        if (e.key === "Enter") setToChart(props.id);
      }}
    >
      <header>
        <Bag />
        <div>
          <Typography color={colors.fontSecondary}>{props.cost}</Typography>
          <Coin />
        </div>
      </header>
      <img src={props.img.url} />
      <hr />
      <Typography color={colors.fontSecondary}>{props.category}</Typography>
      <Typography>{props.name}</Typography>
      <Curtain
        cost={props.cost}
        setToChart={setToChart}
        id={props.id}
        show={selected}
      />
    </button>
  );
};
export default Card;
