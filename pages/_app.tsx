import {
  AppComponent,
  AppProps,
} from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import "../styles/globals.css";
import Head from "next/head";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
