export type MultiSelectProps = {
  options: string[];
  label: string;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export type MediaCardProps = {
  type: "movie" | "series" | "videogame";
  id: number;
  title: string;
  imageUrl: string;
  sinopsis: string;
  tags: string[];
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type PaginatedResponse<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
};
