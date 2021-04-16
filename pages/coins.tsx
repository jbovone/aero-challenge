import React, { Dispatch } from "react";
import View from "../components/normalizers/View";
import Typography from "../components/Typography";
import PromoCard from "../components/PromoCard";
import { flex } from "../utils/flex";
import { CSSObject } from "@emotion/css";
import Box from "../components/Box";
import Error from "next/error";

interface coinsProps {
  user: user;
  appDispatch: Dispatch<action>;
  isAuth: boolean;
}
const back01 = "promoCardBackground.svg";
const back02 = "promoCardBackground2.svg";
const back03 = "promoCardBackground3.svg";

const Coins: React.FC<coinsProps> = ({ user, appDispatch, isAuth }) => {
  const viewCSS: CSSObject = {
    ...flex("flex-start", "center", "column"),
    section: {
      ...flex("space-evenly"),
      flexWrap: "wrap",
      margin: "40px 0px",
    },
    "section:last-child": {},
  };
  const redeemHistoryCSSprops: CSSObject = {
    width: "100%",
    display: "grid",
    img: { width: "90%" },
  };

  if (!isAuth) return <Error statusCode={404} />;
  return (
    <View cssProps={viewCSS}>
      <Typography variant="h1">Your Coins</Typography>
      <Typography variant="h4">
        You currently have ({user.points}) coins. You can get more by exchanging
        more promo codes!!
      </Typography>
      <section>
        <PromoCard
          background={back01}
          points={1000}
          initialValue="1FG2"
          appDispatch={appDispatch}
        />
        <PromoCard
          background={back02}
          points={5000}
          initialValue="ARLM"
          appDispatch={appDispatch}
        />
        <PromoCard
          background={back03}
          points={7500}
          initialValue="3DFG"
          appDispatch={appDispatch}
        />
      </section>
      <Typography variant="h1">Redeem History</Typography>
      <Typography variant="h4">
        Recap how many prizes you have collected already!
      </Typography>
      <Box cssProps={redeemHistoryCSSprops} id="redeem-history">
        {user.redeemHistory.length ? (
          user.redeemHistory.map((item, i) => (
            <article key={item.name + i}>
              <img src={item.img.url} />
            </article>
          ))
        ) : (
          <>
            <Typography variant="h4">
              It seems that you didn't claim prizes yet.
            </Typography>
            <Typography variant="p">
              Look for some promo codes and save to get the prize that you want.
            </Typography>
          </>
        )}
      </Box>
    </View>
  );
};
export default Coins;
