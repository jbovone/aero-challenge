import { useEffect, useState } from "react";
const INVALID_IMPUTS =
  "Items cannot be 0 nor the pages can be more than the items to show.";

export function usePagination<T>(
  itemsPerPage: number,
  itemsCollection: T[]
): Array<T[]> {
  const pages = Math.floor(itemsCollection.length / itemsPerPage);
  if (itemsCollection.length === 0 || pages > itemsPerPage) {
    throw new Error(INVALID_IMPUTS);
  }
  const paginate = () => {
    return Array(itemsPerPage)
      .fill(null)
      .map((_, i) => itemsCollection.slice(pages * i, pages * i + pages - 1));
  };

  const [pagination, setPagination] = useState(paginate());

  useEffect(() => {
    setPagination(paginate());
  }, [itemsPerPage, itemsCollection]);

  return pagination;
}
