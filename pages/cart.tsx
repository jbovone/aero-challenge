import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
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

interface cartProps {
  cart: Product[];
  coins: number;
}

const style: CSSObject = {
  ...flex(),
  flexWrap: "wrap",
  ...media(840, {
    "&>*": {
      width: "100%",
    },
  }),
};

const MediaViewer = styled.section((props: { boxShadow?: string }) => ({
  minWidth: 260,
  "box-shadow": props.boxShadow,
  margin: "10px 15px",
  padding: "1em",
  h2: {
    margin: 10,
  },
}));

const TotalViewer = styled.section((props: { boxShadow?: string }) => ({
  ...flex("flex-start", "flex-start", "column"),
  position: "sticky",
  alignSelf: "flex-start",
  top: "199px",
  width: "40%",
  maxWidth: 350,
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
    width: "100%",
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
}));

const Chart: React.FC<cartProps & cardProps> = ({ cart, coins, setToCart }) => {
  const total = cart.reduce((acc, { cost }) => acc + cost, 0);
  const [redeem, setRedeeem] = useState({
    loading: false,
    error: false,
  });
  useEffect(() => {
    if (redeem.loading) {
      axios
        .post("api/redeems", {
          data: cart.map((prize) => prize.id),
        })
        .then((res) => {
          setRedeeem((state) => ({ ...state, loading: false, error: false }));
          setToCart([]);
        })
        .catch(() => {
          setRedeeem((state) => ({ ...state, loading: false, error: true }));
        });
    }
  }, [redeem.loading]);
  return (
    <View cssProps={style}>
      <MediaViewer boxShadow={boxShadow}>
        <Typography variant="h2" bold>
          Your Prizes:
        </Typography>
        {cart.map((product) => (
          <Media product={product} setToCart={setToCart} key={product.id} />
        ))}
      </MediaViewer>

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
              {Boolean(cart.length) && coins - total}
            </Typography>
          </li>
        </ul>
        <PillButton
          title={"Redeem Prizes"}
          onClick={() => {
            setRedeeem((state) => ({ ...state, loading: true }));
          }}
          disabled={total <= 0}
        />
        {redeem.error && (
          <Typography bold variant="small" color="red">
            Service Unavailable at the Moment
          </Typography>
        )}
      </TotalViewer>
    </View>
  );
};
export default Chart;
