import { AppComponent } from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const [cart, setToCart] = useState<Product[]>([]);
  const [user, setUser] = useState({
    points: 0,
    name: "",
  });

  useEffect(() => {
    fetch("api/auth/me").then((res) =>
      res.json().then((user) => setUser(() => ({ ...user })))
    );
  }, []);

  useEffect(() => {
    console.log(cart, "chart TOP_APP");
  }, [cart, setToCart]);

  return (
    <>
      <Navigation coins={user.points} bagLength={cart.length} />
      <Header />
      <Component
        {...pageProps}
        setToCart={setToCart}
        cart={cart}
        coins={user.points}
      />
    </>
  );
};

export default MyApp;

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

// Note from me: I do consider this unnecessary, of course i need to grab the coins at this point
// but i don't need'em right away, so i prefer fetching the coins client side than producing blocking code.
// And since this will be public in my Gh exposing credentials in client-side code seem's unapropiate
// i will create an api endpoint for this fetch.
