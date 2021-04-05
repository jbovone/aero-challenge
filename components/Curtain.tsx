import { css } from "@emotion/css";
import React from "react";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import Coin from "./svg/Coin";
import Typography from "./Typography";

type curtainProps = {
  show: boolean;
  availableCoins: number;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const Curtain = React.forwardRef<
  HTMLButtonElement,
  curtainProps & Omit<cardProps, "redeemed" | "bagged" | "coins">
>(({ show, product, setRedeem, setSelected, availableCoins }, ref) => {
  const isReedemeable = availableCoins - product.cost > 0;
  const style = css({
    position: "absolute",
    bottom: 0,
    width: "100%",
    transition: ".3s",
    height: show ? "100%" : 0,
    background: colors.primaryAlpha,
    padding: show ? 20 : 0,
    ...flex("space-between", "center", "column"),
    header: {
      background: "white",
      borderRadius: 10,
      padding: 10,
      width: "90%",
      border: `1px solid ${colors.fontSecondary}`,
      ...flex("flex-start", "flex-start", "column"),
      ul: {
        width: "100%",
        position: "relative",
        li: {
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
          <Typography variant="small" color={colors.fontPrimary}>
            {listKey}
          </Typography>
        </span>
        <Typography variant="small" bold color={colors.fontPrimary}>
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
            <Typography variant="p" color={colors.fontSecondary}>
              {product.name}:
            </Typography>
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
          </header>
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
