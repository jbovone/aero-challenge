const NO_COLLECTION = "Items collection cannot be 0.";
const NO_ITEMS_PER_PAGE = "Items per page cannot be 0";

export function paginateCollection<T>(
  itemsPerPage: number,
  itemsCollection: T[]
): Array<T[]> {
  const pages = Math.floor(itemsCollection.length / itemsPerPage);
  if (itemsCollection.length <= 0 || itemsPerPage <= 0) {
    throw new Error(NO_COLLECTION);
  }
  if (itemsPerPage <= 0) {
    throw new Error(NO_ITEMS_PER_PAGE);
  }

  return Array(itemsPerPage)
    .fill(null)
    .map((_, i) => itemsCollection.slice(pages * i, pages * i + pages));
}
