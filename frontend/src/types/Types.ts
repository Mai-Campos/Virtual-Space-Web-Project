import type { Options } from "./MultiSelectTypes";

export type MediaCardProps = {
  type: "movie" | "series" | "videogame";
  id: number;
  title: string;
  coverImg: string;
  synopsis: string;
  tags: Options[];
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};

export type PaginationFilterParams = {
  page: number;
  limit: number;
  search: string | null;
};

export type FilterableContent = {
  nombre: string;
  tags: string[];
};

export interface BackendError {
  errors?: Record<string, string>;
  message?: string;
}

export interface VisualContent {
  id: number;
  title: string;
  synopsis: string;
  coverImg: string;
  genres: Options[];
}

export type VideoGame = Omit<VisualContent, "genres"> & {
  categories: Options[];
  sizeGb: number;
};

export type CompleteMovie = VisualContent & {
  sizeGb: number;
  director: string;
  directorId: number;
};

export type CompleteSerie = VisualContent & {
  sizeGb: number;
  platformId: number;
  platform: string;
  seasons: number;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  password: string;
};
