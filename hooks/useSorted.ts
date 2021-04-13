import { useRef, useState } from "react";

export const useSorted = (products: Product[]) => {
  const sortedProducts = useRef<Readonly<Record<orderBy, Product[]>>>({
    "Most Recent": ((a) => [...a.sort((a, b) => a.createdAt - b.createdAt)])([
      ...products,
    ]),
    "Lowest Price": ((a) => [...a.sort((a, b) => a.cost - b.cost)])([
      ...products,
    ]),
    "Highest Price": ((a) => [...a.sort((a, b) => b.cost - a.cost)])([
      ...products,
    ]),
  });

  const orderTypes = Object.keys(sortedProducts.current) as orderBy[];

  const [orderBy, setOrderBy] = useState<orderBy>("Most Recent");

  return {
    assorted: sortedProducts.current[orderBy],
    setOrderBy,
    activeOrder: orderBy,
    orderTypes,
  };
};
