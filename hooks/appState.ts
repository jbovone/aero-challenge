import { Router } from "next/router";
import react, { useReducer, Reducer } from "react";
import { dialogDispatch } from "../constants/dialogs";
import router from "next/router";

interface appState {
  cart: Product[];
  user: user;
  dialog: DialogProps | null;
}
const initialState: appState = {
  cart: [],
  user: {
    name: "",
    points: 0,
    redeemHistory: [],
  },
  dialog: null,
};

interface DialogProps {
  title?: string;
  timmer?: number;
  dialogType: dialogDispatchEnum;
  id: number;
  cb?: () => void;
}

function useAppState(): [appState, react.Dispatch<action>] {
  const [state, dispatch] = useReducer<Reducer<appState, action>>(
    reducer,
    initialState
  );
  return [state, dispatch];
}

function reducer(state: appState, action: action) {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.addToBag,
          title: action.payload.name,
          cb: () => {},
        },
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.welcomeSuccess,
          title: action.payload.name,
          cb: () => {
            router.push("/redeem");
          },
        },
      };

    case "reedemSuccess":
      return {
        ...state,
        cart: [],
        user: {
          ...state.user,
          points: state.user.points - action.payload,
          redeemHistory: [...state.user.redeemHistory, ...state.cart],
        },
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.purchaseSuccess,
          timmer: 4000,
          cb: () => {
            router.push("/redeem");
          },
        },
      };

    case "removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "bagEmpty":
      return {
        ...state,
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.emptyBag,
          timmer: 2000,
          cb: () => {
            router.push("/redeem");
          },
        },
      };
    case "logOut":
      return {
        ...state,
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.logOut,
          title: action.payload.title,
          timmer: 2000,
          cb: () => {
            action.payload.callback();
            router.push("/");
          },
        },
      };
    case "logOutStage2":
      return {
        ...state,
        user: { points: 0, name: "", redeemHistory: [] },
      };

    case "coinsClaimedSucesss":
      return {
        ...state,
        user: {
          ...state.user,
          points: state.user.points + action.payload,
        },
        dialog: {
          id: state?.dialog === null ? 1 : state.dialog.id + 1,
          dialogType: dialogDispatch.coinsAdded,
          title: action.payload,
          timmer: 3000,
          cb: () => {
            router.push("/redeem");
          },
        },
      };
    default:
      throw new Error("wrong action dispatched");
  }
}

export default useAppState;
