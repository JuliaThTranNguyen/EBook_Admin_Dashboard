import { Pagination } from "./Pagination";

export interface Genre {
  _id: string
  title: string
  booksCount?: number
}

export interface GenresReducerState {
  genres: Genre[];
  loading: boolean;
  error?: string;
  pagination?: Pagination;
}
