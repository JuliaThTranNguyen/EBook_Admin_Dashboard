import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Book, BooksReducerState } from "../../types/Book";
import { RootStatetype } from "../store";
import { BookApiResponse, Pagination } from "../../types/Pagination";

const initialState: BooksReducerState = {
  books: [],
  loading: false,
};

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (page: number, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://nodejs-server-thjulia.vercel.app/api/v1/books?page=${page}`,
        {
          signal,
        }
      );

      if (!response.ok) {
        alert("Oops! There might be something wrong. Please refresh and try again.")
        throw new Error(`Failed to fetch books. Status: ${response.status}`);
      }

      const data: BookApiResponse = await response.json();

      return {
        books: data.data.books,
        pagination: data.data.pagination,
      };
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error fetching books:", error);
      return rejectWithValue("Error fetching books");
    }
  }
);
export const setAllBooks = createAction<Book[]>("books/setAllBooks");

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET ALL DATA FROM BOOK*/
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllBooks.fulfilled,
        (
          state,
          action: PayloadAction<{ books: Book[]; pagination: Pagination }>
        ) => {
          state.books = action.payload.books;
          state.pagination = action.payload.pagination;
          state.loading = false;
        }
      )
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(setAllBooks, (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.loading = false;
    });
  },
});

const booksReducer = bookSlice.reducer;
export const currentBooktotalPages = (state: RootStatetype) =>
  state.book.pagination?.totalPages;
export default booksReducer;
