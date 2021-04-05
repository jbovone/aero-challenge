import { AppComponent } from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import Dialog from "../components/Dialog";
import { dialogDispatch } from "../constants/dialogs";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const [user, setUser] = useState<user>();
  const [cart, setToCart] = useState<Product[]>([]);
  const [dialog, setDialog] = useState<DialogProps | null>(null);

  useEffect(() => {
    fetch("api/auth/me").then((res) =>
      res.json().then((user: user) => {
        setUser(() => ({ ...user }));
        setDialog(() => ({
          dialogType: dialogDispatch.welcomeSuccess,
          title: user.name,
          id: 1,
        }));
      })
    );
  }, []);

  return (
    <>
      <Navigation coins={user ? user.points : 0} bagLength={cart.length} />
      <Header />
      {dialog && (
        <Dialog
          dialogType={dialog.dialogType}
          title={dialog.title}
          id={dialog.id}
          timmer={dialog.timmer}
          cb={dialog.cb}
        />
      )}
      <Component
        {...pageProps}
        setToCart={setToCart}
        setDialog={setDialog}
        cart={cart}
        redeemHistory={user ? user.redeemHistory : []}
        coins={user ? user.points : 0}
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
