import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import View from "../components/normalizers/View";
import Typography from "../components/Typography";
import { flex } from "../utils/flex";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // router.push("/redeem");
  }, []);

  return (
    <View
      cssProps={{
        section: {
          minHeight: 500,
          ...flex("flex-start", "center"),
          background: "url('') no-repeat right",
          backgroundSize: "contain",
          width: "80%",
          padding: 10,
          margin: 60,
          div: {
            margin: "auto",
            width: "70%",
            maxWidth: "640px",
            img: {
              width: "100%",
              height: "40vh",
            },
            h1: {
              left: 0,
            },
          },
        },
      }}
    >
      <Head>
        <title>Redeem your Points</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div>
          <Typography variant="h1">Get awesome prizes!</Typography>
        </div>
      </section>
    </View>
  );
}
