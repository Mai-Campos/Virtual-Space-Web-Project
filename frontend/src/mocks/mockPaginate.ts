import type { PaginatedResponse } from "../types/Types";

export function mockPaginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  const end = page * limit;

  return {
    data: items.slice(start, end),
    currentPage: page,
    totalPages: Math.ceil(items.length / limit),
  };
}
