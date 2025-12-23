import type { PaginationProps } from "../types/Types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 rounded-md bg-white/5 text-white disabled:opacity-40 cursor-pointer"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 cursor-pointer rounded-md text-sm font-medium ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 rounded-md bg-white/5 text-white disabled:opacity-40 cursor-pointer"
      >
        →
      </button>
    </div>
  );
}
