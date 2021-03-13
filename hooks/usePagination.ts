import { useEffect, useState } from "react";
const NO_COLLECTION = "Items collection cannot be 0.";
const NO_ITEMS_PER_PAGE = "Items per page cannot be 0";

export function usePagination<T>(
  itemsPerPage: number,
  itemsCollection: T[]
): Array<T[]> {
  const pages = Math.ceil(itemsCollection.length / itemsPerPage);
  if (itemsCollection.length <= 0 || itemsPerPage <= 0) {
    throw new Error(NO_COLLECTION);
  }
  if (itemsPerPage <= 0) {
    throw new Error(NO_ITEMS_PER_PAGE);
  }

  const paginate = () => {
    return Array(pages)
      .fill(null)
      .map((_, i) =>
        itemsCollection.slice(itemsPerPage * i, itemsPerPage * i + itemsPerPage)
      );
  };

  const [pagination, setPagination] = useState(paginate());

  useEffect(() => {
    setPagination(paginate());
  }, [itemsPerPage, itemsCollection]);

  return pagination;
}
