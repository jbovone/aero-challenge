import { css } from "@emotion/css";
import React from "react";
import Link from "next/link";
import Aerolab from "./svg/Aerolab";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import Coin from "./svg/Coin";
import Bag from "./svg/Bag";
import styled from "@emotion/styled";
import AeroNavLink from "./AeroNavLink";
import { keyframes } from "@emotion/react";
import { Input } from "./FancyInputs";
import MainButton from "./MainButton";
import router from "next/router";
import Gift from "../components/svg/Gift";

interface NavigationProps {
  coins: number;
  bagLength: number;
  logIn: boolean;
}

const style = css({
  padding: 10,
  height: "var(--header-height)",
  ...flex("space-between"),

  aside: {
    ...flex(),
    "&>*": {
      whiteSpace: "nowrap",
    },
    ".coins": {
      p: {
        position: "absolute",
        top: 7,
        left: "13%",
      },
    },
    ".aside-item": {
      position: "relative",
      cursor: "pointer",
      ...flex("center", "center", "column"),
      margin: 10,

      "&>*": {
        margin: 0,
      },
      svg: {
        width: "40px",
        height: "40px",

        zIndex: -1,
      },
    },
  },
});

const pulsate = keyframes`
  50% {
    transform: scale(1.1)
  }
`;

const Badge = styled.article({
  background: "red",
  borderRadius: "50%",
  ...flex("center", "center"),
  position: "absolute",
  top: 0,
  right: 0,
  height: 25,
  width: 25,
  animation: `${pulsate} 3.5s ease infinite`,
});

const Navigation: React.FC<NavigationProps> = ({ coins, bagLength, logIn }) => {
  console.log(logIn, "LOGIN");
  return (
    <nav className={style}>
      <a href="https://aerolab.co/">
        <Aerolab />
      </a>
      {logIn ? (
        <aside>
          <Link href="/redeem">
            <div className="aside-item">
              <Gift />
              <Typography bold variant="small">
                Prizes
              </Typography>
            </div>
          </Link>
          <Link href="/coins">
            <div className="aside-item coins">
              <Coin />
              <Typography bold variant="p">
                {coins}
              </Typography>
              <Typography bold variant="small">
                Your Coins
              </Typography>
            </div>
          </Link>
          <Link href="/cart">
            <div className="aside-item">
              {Boolean(bagLength) && (
                <Badge>
                  <Typography bold variant="p" color="fontInverse">
                    {bagLength}
                  </Typography>
                </Badge>
              )}
              <Bag />
              <Typography bold variant="small">
                Your Cart
              </Typography>
            </div>
          </Link>
        </aside>
      ) : (
        <MainButton
          title="Sign In"
          onClick={() => router.push("?form=sign-in")}
        />
      )}
    </nav>
  );
};
export default Navigation;
