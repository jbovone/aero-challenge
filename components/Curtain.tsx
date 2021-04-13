import { css, CSSObject } from "@emotion/css";
import React, { Dispatch } from "react";
import { FaChessBoard } from "react-icons/fa";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import Coin from "./svg/Coin";
import Typography from "./Typography";

type curtainProps = {
  show: boolean;
  availableCoins: number;
  setRedeem: () => void;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const Curtain = React.forwardRef<
  HTMLButtonElement,
  curtainProps & Omit<cardProps, "redeemed" | "bagged" | "points">
>(({ show, product, setRedeem, setSelected, availableCoins }, ref) => {
  const isReedemeable = availableCoins - product.cost > 0;
  const boxStyle: CSSObject = {
    background: "rgb(255,255,255,.82)",
    borderRadius: 10,
    padding: 10,
    border: `1px solid ${colors.fontSecondary}`,
    width: "80%",
  };
  const style = css({
    position: "absolute",
    bottom: 0,
    width: "100%",
    transition: ".3s",
    height: show ? "100%" : 0,
    background: colors.primaryAlpha,
    padding: show ? 23 : 0,
    "&>*": {
      minWidth: 170,
    },
    ...flex("space-between", "center", "column"),
    header: {
      ...boxStyle,
      ...flex("center", "center", "row"),
    },
    ul: {
      ...boxStyle,
      ...flex("flex-start", "center", "column"),
      position: "relative",
      li: {
        marginBottom: 7,
        "span small": {
          margin: 0,
        },
        span: {
          ...flex("center", "center"),
        },
        ...flex("space-between"),
        padding: 3,
        width: "100%",
      },
      svg: {
        height: 15,
        width: 15,
      },
    },
    "button:hover, button:focus": {
      transform: "scale(1) !important",
    },
  });

  interface listPorps {
    listKey: string;
    listValue: string | number;
  }

  const ListItem: React.FC<listPorps> = ({ listKey, listValue }) => {
    return (
      <li>
        <span>
          <Coin />
          <Typography variant="small" bold>
            {listKey}
          </Typography>
        </span>
        <Typography variant="small" bold>
          {listValue}
        </Typography>
      </li>
    );
  };

  return (
    <div className={style}>
      {show && (
        <>
          <header>
            <Typography variant="p" color="fontSecondary" align="center">
              {product.name}
            </Typography>
          </header>

          <ul>
            <ListItem listKey="Your coins:" listValue={availableCoins} />
            <ListItem listKey="Will cost:" listValue={product.cost} />
            {isReedemeable ? (
              <ListItem
                listKey="Coins left:"
                listValue={availableCoins - product.cost}
              />
            ) : (
              <Typography variant="small">
                -Not enough points to claim!
              </Typography>
            )}
          </ul>
          <PillButton
            ref={ref}
            onClick={(e) => {
              isReedemeable && setRedeem();
              e.currentTarget.blur();
            }}
            onBlur={() => setSelected(false)}
            title={availableCoins - product.cost < 0 ? "CLOSE" : "REDEEM NOW"}
          />
        </>
      )}
    </div>
  );
});
export default Curtain;
