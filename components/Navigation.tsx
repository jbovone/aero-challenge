import { css } from "@emotion/css";
import React from "react";
import Link from "next/link";
import Aerolab from "./svg/Aerolab";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import { colors } from "../constants/colors";
import Coin from "./svg/Coin";
import Bag from "./svg/Bag";

interface NavigationProps {
  coins: number;
}

const style = css({
  padding: 10,
  a: {
    cursor: "pointer",
    position: "relative",
    ":hover": {
      ".decorator": {
        transition: "500ms",
        width: "100%",
      },
    },
  },
  ...flex("space-between"),
  aside: {
    ...flex(),
    "&>*": {
      margin: 8,
    },
    position: "relative",
    ".decorator": {
      height: "3px",
      width: "0px",
      position: "absolute",
      transition: "500ms",
      background: colors.decorators[0],
    },
    "a:active": {
      ".decorator": {
        transition: "500ms",
        width: "100%",
      },
    },
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

const Navigation: React.FC<NavigationProps> = ({ coins }) => {
  return (
    <nav className={style}>
      <a href="https://aerolab.co/">
        <Aerolab />
      </a>
      <aside>
        <a>
          <Typography>Home</Typography>
          <div className="decorator" />
        </a>
        <a href="">
          <Typography>Proyects</Typography>
          <div className="decorator" />
        </a>
        <a href="">
          <Typography>Contact</Typography>
          <div className="decorator" />
        </a>

        <Link href="/redeem">
          <a>
            <Typography>Your Prices</Typography>
            <div className="decorator" />
          </a>
        </Link>
        <div className="coins">
          <Coin size={45} />
          <Typography variant="small"> Your Coins</Typography>
          <Typography variant="h2">{coins || 2000}</Typography>
        </div>
        <Link href="/bag">
          <a className="bag">
            <Bag size={45} />
            <Typography variant="small"> Your Bag</Typography>
          </a>
        </Link>
      </aside>
    </nav>
  );
};
export default Navigation;
