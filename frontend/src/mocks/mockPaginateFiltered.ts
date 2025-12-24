import type { FilterableContent, PaginationFilterParams } from "../types/Types";

export function mockPaginateFiltered<T extends FilterableContent>(
  items: T[],
  { page, limit, search, tags }: PaginationFilterParams
) {
  let filtered = items;

  if (search) {
    filtered = filtered.filter((i) =>
      i.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (tags) {
    filtered = filtered.filter((i) => tags.every((t) => i.tags.includes(t)));
  }

  const start = (page - 1) * limit;
  const end = page * limit;

  return {
    data: filtered.slice(start, end),
    currentPage: page,
    totalPages: Math.ceil(filtered.length / limit),
  };
}
