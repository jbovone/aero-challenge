import { AppComponent } from "next/dist/next-server/lib/router/router";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
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
        isAuth={Boolean(user.name)}
        appDispatch={dispatch}
        user={user}
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
        isAuth={Boolean(user.name)}
      />
      <Footer />
    </>
  );
};

export default MyApp;
