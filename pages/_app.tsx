import { AppComponent } from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import "../styles/globals.css";
import Navigation from "../components/Navigation";

export async function getStaticProps() {}

const MyApp: AppComponent = ({ Component, pageProps }) => {
  console.log(pageProps, "PAGEPROPS");
  return (
    <>
      <Navigation coins={120} />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
