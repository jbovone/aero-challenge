import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { boxShadow } from "../constants/boxShadow";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import Button from "./normalizers/Button";
import Typography from "./Typography";
import router from "next/router";

interface DropdownMenuProps {
  setShow: React.Dispatch<SetStateAction<boolean>>;
  show: boolean;
  appDispatch: Dispatch<action>;
  user: user;
}

const UserMenu = styled.section({
  position: "absolute",
  padding: 13,
  minWidth: 140,
  bottom: 10,
  right: 20,
  borderRadius: 3,
  boxShadow: boxShadow,
  border: "1px solid lightgray",
  ...flex("center", "center", "column"),
  transform: "translateY(100%)",
  zIndex: 10000,
  background: "white",
  "&>*": {
    padding: 10,
    borderBottom: "1px solid lightgray",
    width: "100%",
  },
  "button:hover small": {
    color: colors.primary,
  },
});

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  setShow,
  show,
  appDispatch,
  user,
}) => {
  const userMenu = [
    {
      contents: "Redeem History",
      action: () => router.push("/coins/#redeem-history"),
    },
    {
      contents: "Log Out",
      action: () =>
        appDispatch({
          type: "logOut",
          payload: {
            title: user.name,
            callback: () => appDispatch({ type: "logOutStage2" }),
          },
        }),
    },
  ];
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function handleClickOutMenu(e: Event) {
      if (e.target !== ref.current) {
        setShow(() => false);
      }
    }
    window.addEventListener("click", handleClickOutMenu);

    return () => {
      window.removeEventListener("click", handleClickOutMenu);
    };
  }, [show, setShow]);

  return (
    <UserMenu ref={ref}>
      <Typography variant="small" bold align="center" color="fontSecondary">
        User Menu
      </Typography>
      {userMenu.map((item) => (
        <Button onClick={item.action} key={item.contents}>
          <Typography variant="small" align="center" color="fontSecondary">
            {item.contents}
          </Typography>
        </Button>
      ))}
      <Button>
        <Typography variant="small" align="center" color="fontSecondary">
          Close Menu
        </Typography>
      </Button>
    </UserMenu>
  );
};
export default DropdownMenu;
