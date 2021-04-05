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

interface user {
  points: 0;
  name: string;
  redeemHistory: Product[];
}

interface cardProps {
  product: Product;
  redeemed: boolean;
  bagged: boolean;
  coins: number;
  setRedeem: React.Dispatch<
    React.SetStateAction<Product[]>,
    React.SetStateAction<dialogProps>
  >;
}

type dialogDispatchEnum =
  | "ADD_TO_BAG"
  | "PURCHASE_SUCCESS"
  | "WELCOME_SUCCESS"
  | "EMPTY_BAG";

interface DialogProps {
  title?: string;
  timmer?: number;
  dialogType: dialogDispatchEnum;
  id: number;
  cb?: () => void;
}

type orderBy = "Most Recent" | "Lowest Price" | "Highest Price";
