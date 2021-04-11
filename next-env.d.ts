/// <reference types="next" />
/// <reference types="next/types/global" />

interface Product {
  img: {
    url: string;
    hdUrl: string;
  };
  id: string;
  name: string;
  cost: number;
  category: string;
}

type actionTypes =
  | "addToCart"
  | "removeFromCart"
  | "reedemSuccess"
  | "bagEmpty"
  | "setUser"
  | "logOut"
  | "logOutStage2"
  | "coinsClaimedSucesss";

interface action {
  type: actionTypes;
  payload?: any;
}

interface user {
  points: number;
  name: string;
  redeemHistory: Product[];
}

interface cardProps {
  product: Product;
  redeemed: boolean;
  bagged: boolean;
  points: number;
  setRedeem: Dispatch<action>;
}

type dialogDispatchEnum =
  | "ADD_TO_BAG"
  | "PURCHASE_SUCCESS"
  | "WELCOME_SUCCESS"
  | "EMPTY_BAG"
  | "LOG_OUT";

interface DialogProps {
  title?: string;
  timmer?: number;
  dialogType: dialogDispatchEnum;
  id: number;
  cb?: () => void;
}

type forms = "sign-in" | "sign-up";

interface formHandlerProps {
  appDispatch: Dispatch<action>;
  show: boolean;
  form: forms;
}

type orderBy = "Most Recent" | "Lowest Price" | "Highest Price";
