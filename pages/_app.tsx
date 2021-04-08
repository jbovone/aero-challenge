import { AppComponent } from "next/dist/next-server/lib/router/router";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import Dialog from "../components/Dialog";
import Footer from "../components/Footer";
import useAppState from "../hooks/appState";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const [{ cart, dialog, user }, dispatch] = useAppState();

  return (
    <>
      <Navigation
        coins={user ? user.points : 0}
        bagLength={cart.length}
        logIn={Boolean(user.name)}
      />
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
        appDispatch={dispatch}
        cart={cart}
        user={user}
        logIn={false}
      />
      <Footer />
    </>
  );
};

export default MyApp;
