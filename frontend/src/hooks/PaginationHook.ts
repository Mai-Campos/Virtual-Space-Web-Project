import { useEffect, useState } from "react";
import type { PaginatedResponse } from "../types/Types";

export function usePaginatedData<T>(
  fetcher: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
  limit = 5
) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);

      try {
        const res = await fetcher(currentPage, limit);
        if (!isMounted) return;

        setData(res.data);
        setTotalPages(res.totalPages);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentPage, limit, fetcher]);

  return {
    data,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  };
}
