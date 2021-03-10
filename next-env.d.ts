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

interface cardProps {
  product: Product;
  order?: number;
  setToCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

type orderBy = "Most Recent" | "Lowest Price" | "Highest Price";
