import { Pagination } from "./Pagination";

export interface Author {
  _id: string
  name: string
  bio: string
  image: string
}

export interface AuthorsReducerState {
  authors: Author[];
  loading: boolean;
  error?: string;
  pagination?: Pagination;
}
