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
}

interface cardProps {
  product: Product;
  order?: number;
  setRedeem: React.Dispatch<
    React.SetStateAction<Product[]>,
    React.SetStateAction<dialogProps>
  >;
}

type dialogDispatchEnum = "ADD_TO_BAG" | "PURCHASE_SUCESS" | "WELLCOME_SUCCESS";
interface dialogProps {
  id: dialogDispatchEnum | null;
  title: string | null;
}

type orderBy = "Most Recent" | "Lowest Price" | "Highest Price";
