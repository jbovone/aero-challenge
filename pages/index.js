import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    //router.push("/redeem");
  }, []);

  return (
    <div>
      <Head>
        <title>Redeem your Points</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
