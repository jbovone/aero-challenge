import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import React, { Dispatch, useEffect } from "react";
import Media from "../components/Media";
import View from "../components/normalizers/View";
import PillButton from "../components/PillButton";
import { boxShadow } from "../constants/boxShadow";
import Typography from "../components/Typography";
import { colors } from "../constants/colors";
import { flex } from "../utils/flex";
import { media } from "../utils/media";
import Separator from "../components/Separator";
import Error from "next/error";
import useFetch from "../hooks/useFetch";
import Box from "../components/Box";

const MediaViewer = styled.section({
  flex: 1,
  boxShadow: boxShadow,
  margin: "10px 15px",
  padding: "1em",
  h2: {
    margin: 10,
  },
});

const TotalViewer = styled.section({
  ...flex("flex-start", "center", "column"),
  position: "sticky",
  alignSelf: "flex-start",
  top: "199px",
  width: "40%",
  maxWidth: 500,
  minWidth: 400,
  border: `solid 1px ${colors.buttonInactive} `,
  boxShadow: boxShadow,
  borderRadius: 7,
  margin: "1em",
  marginBottom: "20",
  padding: "1.4em",
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
    alignSelf: "center",
  },
  footer: {
    ...flex("space-between", "center", "column"),
    minHeight: 85,
  },
  "@media (max-width: 430px)": {
    minWidth: "unset",
    width: "90%",
  },
});

interface cartProps {
  cart: Product[];
  user: user;
  isAuth: boolean;
  appDispatch: Dispatch<action>;
}

const Cart: React.FC<cartProps> = ({ cart, user, appDispatch, isAuth }) => {
  const { points } = user;
  const total = cart.reduce((acc, { cost }) => acc + cost, 0);
  const [{ loading, error, success }, handleRedeem] = useFetch();

  const style: CSSObject = {
    ...flex("center", "center"),
    minHeight: "80vh",
    flexWrap: "wrap",
    background: success ? `url('/images/successBackground.svg')` : "unset",
    ...media(840, {
      "&>*": {
        width: "100%",
      },
    }),
  };

  useEffect(() => {
    if (cart.length === 0 && success === false && error === false) {
      appDispatch({
        type: "bagEmpty",
      });
    }
  }, []);

  if (!isAuth) return <Error statusCode={404} />;
  return (
    <View cssProps={style}>
      {cart.length === 0 ? (
        <Box>
          {success && (
            <img
              className="emojidex-emoji"
              src="https://cdn.emojidex.com/emoji/seal/tada.png"
              emoji-code="tada"
              emoji-moji="🎉"
              alt="tada"
            />
          )}
          <Typography variant="h2" bold>
            {success
              ? "Contragutation for your purchase!"
              : "Oh! ..seems like the cart is empty"}
          </Typography>
          <Typography variant="small" bold>
            Go back to shopping for some awesome Prizes!
          </Typography>
        </Box>
      ) : (
        <MediaViewer>
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
        <TotalViewer>
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
          <footer>
            <PillButton
              title={points - total < 0 ? "Not Enough Points" : "Redeem Prizes"}
              onClick={() =>
                handleRedeem(
                  "api/redeems",
                  cart.map((prize) => prize.id),
                  () => appDispatch({ type: "reedemSuccess", payload: total })
                )
              }
              disabled={total <= 0 || points - total < 0 || loading}
            />
            {error && (
              <Typography bold variant="small" color="danger">
                Service Unavailable at the moment.
              </Typography>
            )}
          </footer>
        </TotalViewer>
      )}
    </View>
  );
};
export default Cart;
