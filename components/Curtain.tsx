import { css } from "@emotion/css";
import React from "react";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import Coin from "./svg/Coin";
import Typography from "./Typography";

interface CurtainProps {
  show: boolean;
  cost: number;
  id: string;
  setToChart: Function;
}

const Curtain: React.FC<CurtainProps> = ({ show, cost, id, setToChart }) => {
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
              {cost}
            </Typography>{" "}
            <Coin />
          </span>
          <PillButton onClick={() => setToChart(id)} title="Redeem now" />
        </>
      )}
    </div>
  );
};
export default Curtain;
