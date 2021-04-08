import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import React, { Dispatch, useEffect, useState } from "react";
import Media from "../components/Media";
import View from "../components/normalizers/View";
import PillButton from "../components/PillButton";
import { boxShadow } from "../constants/boxShadow";
import Typography from "../components/Typography";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import { media } from "../utils/media";
import Separator from "../components/Separator";
import axios from "axios";
import { useRouter } from "next/router";

const EmptyBag = styled.section((props: { boxShadow?: string }) => ({
  flex: 1,
  maxWidth: 800,
  background: "white",
  ...flex("space-evenly", "center", "column"),
  "box-shadow": props.boxShadow,
  margin: "10px 15px",
  padding: "8em 1em",
  "h2, p": {
    textAlign: "center",
    marginBottom: "1em",
  },
}));

const MediaViewer = styled.section((props: { boxShadow?: string }) => ({
  flex: 1,
  "box-shadow": props.boxShadow,
  margin: "10px 15px",
  padding: "1em",
  h2: {
    margin: 10,
  },
}));

const TotalViewer = styled.section((props: { boxShadow?: string }) => ({
  ...flex("flex-start", "center", "column"),
  position: "sticky",
  alignSelf: "flex-start",
  top: "199px",
  width: "40%",
  maxWidth: 500,
  minWidth: 400,
  border: `solid 1px ${colors.buttonInactive} `,
  "box-shadow": props.boxShadow,
  borderRadius: 7,
  margin: "1em",
  marginBottom: "20",
  padding: "1.4em",
  paddingBottom: 40,
  "&>*": {
    margin: "11px 13px",
  },
  ul: {
    width: "90%",
  },
  li: {
    margin: "1em 2.4em",
    ...flex("space-between"),
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    bottom: 5,
  },
  "@media (max-width: 430px)": {
    minWidth: "unset",
    width: "90%",
  },
}));

interface cartProps {
  cart: Product[];
  user: user;
  appDispatch: Dispatch<action>;
}

const Cart: React.FC<cartProps> = ({ cart, user, appDispatch }) => {
  const { points } = user;
  const total = cart.reduce((acc, { cost }) => acc + cost, 0);
  const [redeem, setRedeem] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const style: CSSObject = {
    ...flex("center", "center"),
    minHeight: "80vh",
    flexWrap: "wrap",
    background: redeem.success
      ? `url('/images/successBackground.svg')`
      : "unset",
    ...media(840, {
      "&>*": {
        width: "100%",
      },
    }),
  };

  useEffect(() => {
    if (redeem.loading) {
      axios
        .post("api/redeems", {
          data: cart.map((prize) => prize.id),
        })
        .then(() => {
          setRedeem(() => ({
            loading: false,
            error: false,
            success: true,
          }));
          appDispatch({ type: "reedemSuccess" });
        })
        .catch(() => {
          setRedeem(() => ({
            loading: false,
            success: false,
            error: true,
          }));
        });
    }
  }, [redeem.loading]);

  return (
    <View cssProps={style}>
      {cart.length === 0 ? (
        <EmptyBag boxShadow={boxShadow}>
          {redeem.success && (
            <img
              className="emojidex-emoji"
              src="https://cdn.emojidex.com/emoji/seal/tada.png"
              emoji-code="tada"
              emoji-moji="🎉"
              alt="tada"
            />
          )}
          <Typography variant="h2" bold>
            {redeem.success
              ? "Contragutation for your purchase!"
              : "Oh! ..seems like the cart is empty"}
          </Typography>
          <Typography variant="small" bold>
            Go back to shopping for some awesome Prizes!
          </Typography>
        </EmptyBag>
      ) : (
        <MediaViewer boxShadow={boxShadow}>
          <Typography variant="h2" bold>
            Your Prizes:
          </Typography>
          {cart.map((product) => (
            <Media
              product={product}
              appDispatch={appDispatch}
              key={product.id}
            />
          ))}
        </MediaViewer>
      )}

      {cart.length > 0 && (
        <TotalViewer boxShadow={boxShadow}>
          <Typography bold variant="h2">
            Summary:
          </Typography>
          <Separator />
          <ul>
            {cart.map((prize, i) => (
              <li key={i}>
                <Typography> {prize.name}: </Typography>
                <Typography bold> {prize.cost}</Typography>
              </li>
            ))}
            <Separator />
            <li>
              <Typography>Total:</Typography>
              <Typography bold>{Boolean(cart.length) && total}</Typography>
            </li>
            <li>
              <Typography>Coins after Claim:</Typography>
              <Typography bold>
                {Boolean(cart.length) && points - total}
              </Typography>
            </li>
          </ul>
          <div />
          <PillButton
            title={points - total < 0 ? "Not Enough Points" : "Redeem Prizes"}
            onClick={() => {
              setRedeem((state) => ({ ...state, loading: true }));
            }}
            disabled={total <= 0 || points - total < 0}
          />
          {redeem.error && (
            <Typography bold variant="small" color="red">
              Service Unavailable at the moment.
            </Typography>
          )}
        </TotalViewer>
      )}
    </View>
  );
};
export default Cart;
