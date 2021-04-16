import { css, SerializedStyles } from "@emotion/react";
import React, { useState, Dispatch } from "react";
import Link from "next/link";
import Aerolab from "./svg/Aerolab";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import Coin from "./svg/Coin";
import Bag from "./svg/Bag";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import MainButton from "./MainButton";
import { useRouter } from "next/router";
import Gift from "../components/svg/Gift";
import { FaUser } from "react-icons/fa";
import { colors } from "../constants/colors";
import { boxShadow } from "../constants/boxShadow";
import { media } from "../utils/media";
import DropdownMenu from "./DropdownMenu";
import Button from "./normalizers/Button";

interface NavigationProps {
  coins: number;
  bagLength: number;
  isAuth: boolean;
  appDispatch: Dispatch<action>;
  user: user;
}

const style: SerializedStyles = css({
  padding: 10,
  height: "var(--header-height)",
  ...flex("space-between"),
  position: "relative",
  aside: {
    ...flex(),
    "&>*": {
      whiteSpace: "nowrap",
    },
    ".coins": {
      p: {
        position: "absolute",
        width: "100%",
        bottom: 17,
      },
    },
    ".aside-item": {
      position: "relative",
      cursor: "pointer",
      ...flex("center", "center", "column"),
      margin: 10,
      svg: {
        width: "40px",
        height: "40px",
        zIndex: -1,
      },
    },
    "button:Last-child ": {
      svg: {
        transform: "scale(.5) translateY(2px)",
        fill: colors.primary,
      },

      "&::after": {
        boxShadow: boxShadow,
        content: "''",
        height: 33,
        width: 33,
        borderRadius: "50%",
        position: "absolute",
        zIndex: -2,
        bottom: 18,
      },
    },
    ...media(500, {
      "div:Last-child svg": {
        transform: "scale(.5) translateY(-2px)",
      },
    }),
  },
});

const Badge = styled.article({
  background: "red",
  borderRadius: "50%",
  ...flex("center", "center"),
  position: "absolute",
  top: 0,
  right: 0,
  height: 25,
  width: 25,
});

const Navigation: React.FC<NavigationProps> = ({
  coins,
  bagLength,
  isAuth,
  appDispatch,
  user,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { push, pathname } = useRouter();

  return (
    <nav css={style}>
      <a href="/">
        <Aerolab />
      </a>
      {isAuth ? (
        <>
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
                <Typography bold variant="p" align="center">
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
            <Button
              className="aside-item"
              onClick={() => setShowUserMenu((show) => !show)}
            >
              <FaUser />
              <Typography bold variant="small">
                {user.name}
              </Typography>
            </Button>
          </aside>
          {showUserMenu && (
            <DropdownMenu
              show={showUserMenu}
              setShow={setShowUserMenu}
              appDispatch={appDispatch}
              user={user}
            />
          )}
        </>
      ) : pathname === "/" ? (
        <MainButton title="Sign In" onClick={() => push("?form=sign-in")} />
      ) : (
        <> </>
      )}
    </nav>
  );
};
export default Navigation;
