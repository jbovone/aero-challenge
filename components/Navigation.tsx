import { css } from "@emotion/css";
import React from "react";
import Link from "next/link";
import Aerolab from "./svg/Aerolab";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import { colors } from "../constants/colors";
import Coin from "./svg/Coin";
import Bag from "./svg/Bag";
import styled from "@emotion/styled";
import AeroNavLink from "./AeroNavLink";
import { keyframes } from "@emotion/react";

interface NavigationProps {
  coins: number;
  bagLength: number;
}

const style = css({
  padding: 10,
  ...flex("space-between"),

  aside: {
    ...flex(),
    "&>*": {
      margin: 8,
      whiteSpace: "nowrap",
    },
    position: "relative",
  },
  ".coins, .bag": {
    ...flex("center", "center", "column"),
  },
  ".coins": {
    h2: {
      position: "absolute",
    },
  },
});

const pulsate = keyframes`
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(1.09)
  }
`;

const Badge = styled.div({
  background: "red",
  borderRadius: "50%",
  position: "absolute",
  ...flex(),
  top: 10,
  right: 5,
  height: 22,
  width: 22,
  animation: `${pulsate} 1.5s ease infinite`,
});

const Navigation: React.FC<NavigationProps> = ({ coins, bagLength }) => {
  return (
    <nav className={style}>
      <a href="https://aerolab.co/">
        <Aerolab />
      </a>
      <aside>
        <AeroNavLink title="Home" href="/Home" />
        <AeroNavLink title="Prizes" href="/redeem" />
        <div className="coins">
          <Coin size={45} />
          <Typography variant="small" bold>
            Your Coins
          </Typography>
          <Typography variant="h2">{coins || 2000}</Typography>
        </div>

        <Link href="/cart">
          <a className="bag">
            {Boolean(bagLength) && (
              <Badge>
                <Typography variant="small" bold color={colors.fontInverse}>
                  {bagLength}
                </Typography>
              </Badge>
            )}
            <Bag size={45} />
            <Typography bold variant="small">
              Your Bag
            </Typography>
          </a>
        </Link>
      </aside>
    </nav>
  );
};
export default Navigation;
