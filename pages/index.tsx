import { css } from "@emotion/css";
import Head from "next/head";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import Typography from "../components/Typography";
import { flex } from "../utils/flex";
import { Dispatch, SetStateAction } from "react";
import Form from "../components/Form";

interface homeProps {
  logIn: boolean;
  appDispatch: Dispatch<action>;
}

const Home: React.FC<homeProps> = ({ logIn, appDispatch }) => {
  const { query, push } = useRouter();
  const style = css({
    minHeight: "100vh",
    width: "100%",
    ...flex("center", "center", "row"),
    img: {
      width: "90%",
      maxWidth: 1100,
    },
    div: {
      maxWidth: 680,
      padding: 20,
      minHeight: 390,
      ...flex("space-between", "flex-start", "column"),
    },
    "@media (max-width: 1300px)": {
      ...flex("space-evenly", "center", "column"),
    },
  });

  return (
    <main className={style}>
      <Head>
        <title>Aero promo win prizes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Typography variant="h1">
          Join the promo and win awesome prizes!
        </Typography>
        <Typography variant="h3">
          Look for the promo codes in every purchase and claim your Aero Coins.
        </Typography>

        <MainButton
          color="decorator"
          title="Sign Up"
          variant="outlined"
          onClick={() => push("/?form=sign-up", undefined, { shallow: true })}
        />
      </div>
      <img src="/images/backHome.png" alt="" />
      <Form
        show={Boolean(query?.form === "sign-in" || query.form === "sign-up")}
        form={query?.form as forms}
        appDispatch={appDispatch}
      />
    </main>
  );
};

export default Home;
