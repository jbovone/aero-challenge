import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import View from "../components/normalizers/View";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/redeem");
  }, []);

  return (
    <View>
      <Head>
        <title>Redeem your Points</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>hola index</div>
    </View>
  );
}
