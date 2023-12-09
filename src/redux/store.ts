import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./reducers/booksReducer";
import genresReducer from "./reducers/genresReducer";
import authorsReducer from "./reducers/authorsReducer";
import authReducer from "./reducers/authReducer";


export const createStore = () => configureStore({
    reducer:{
        book: booksReducer,
        genre: genresReducer,
        author: authorsReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

const store = createStore()

store.subscribe(() => {
    const access_Token = store.getState().auth.access_Token;
    if (access_Token) {
      localStorage.setItem("accessToken", access_Token);
    }
    localStorage.getItem("accessToken");
});

export type RootStatetype = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store