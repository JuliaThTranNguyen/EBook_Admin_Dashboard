import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

import { Box, Typography, Button, Input } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import styled from "@emotion/styled";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { Author } from "../../../types/Author";
import { Genre } from "../../../types/Genre";
import {
  currentAuthortotalPages,
  getAllAuthors,
  setAllAuthors,
} from "../../../redux/reducers/authorsReducer";
import {
  currentGenretotalPages,
  getAllGenres,
  setAllGenres,
} from "../../../redux/reducers/genresReducer";
import { addBook } from "../../../functions/forBook";
import {
  currentBooktotalPages,
  getAllBooks,
  setAllBooks,
} from "../../../redux/reducers/booksReducer";
import { Book } from "../../../types/Book";

const CustomBox = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.724)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CustomModel = styled(Box)({
  padding: 50,
  borderRadius: 10,
  backgroundColor: "#2a3447",
  position: "relative",
});

const CustomCloseButton = styled(Button)({
  top: -30,
  left: 470,
  color: "white",
  fontSize: 15,
});

const CustomForm = styled(Form)({
  display: "flex",
  flexWrap: "wrap",
  maxWidth: 500,
  justifyContent: "space-between",
  paddingTop: 15,
  gap: 10,
});

const CustomFormItem = styled(Box)({
  width: "40%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 20,
});

const CustomLabel = styled(Typography)({
  fontSize: 14,
});

const CustomInput = styled(Input)({
  padding: 10,
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  border: "1px solid #ddd",
  BorderAllRounded: 3,
});

const CustomSelect = styled(Select)({
  padding: 10,
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  border: "1px solid #ddd",
  borderRadius: 3,
});

const CustomSubmitButton = styled(Button)({
  width: "100%",
  padding: 10,
  cursor: "pointer",
  border: "1px solid #384256",
});

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | null;
};

export const AddOneBook = (props: Props) => {
  const [createdData, setCreatedData] = useState<Record<string, any>>({});
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.author.authors);
  const genres = useAppSelector((state) => state.genre.genres);
  const totalBookPages: number = useAppSelector(currentBooktotalPages) ?? 3;
  const totalAuthorPages: number = useAppSelector(currentAuthortotalPages) ?? 3;
  const totalGenrePages: number = useAppSelector(currentGenretotalPages) ?? 3;

  /*FETCH ALL DATA FOR AUTHORS & GENRES*/
  useEffect(() => {
    const fetchAuthorData = async () => {
      let currentPage = 1;
      let allAuthors: Author[] = [];

      while (currentPage <= totalAuthorPages) {
        const result = await dispatch(getAllAuthors(currentPage));

        if (getAllAuthors.fulfilled.match(result)) {
          const { authors } = result.payload;
          allAuthors = [...allAuthors, ...authors];
          currentPage += 1;
        } else {
          break;
        }
      }

      dispatch(setAllAuthors(allAuthors));
    };
    fetchAuthorData();

    const fetchGenreData = async () => {
      let currentPage = 1;
      let allGenres: Genre[] = [];

      while (currentPage <= totalGenrePages) {
        const result = await dispatch(getAllGenres(currentPage));

        if (getAllGenres.fulfilled.match(result)) {
          const { genres } = result.payload;
          allGenres = [...allGenres, ...genres];
          currentPage += 1;
        } else {
          break;
        }
      }

      dispatch(setAllGenres(allGenres));
    };
    fetchGenreData();
  }, [dispatch, totalAuthorPages, totalGenrePages]);

  /*CREATE A NEW BOOK*/
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createdDataWithIds = {
        ...createdData,
        authors: selectedAuthorIds,
        genres: selectedGenreIds,
      };

      await addBook(createdDataWithIds, props.accessToken);
      // Update data after creating the book
      const result = await dispatch(getAllBooks(1));
      if (getAllBooks.fulfilled.match(result)) {
        const { books } = result.payload;
        dispatch(setAllBooks(books));
      }

      // Fetch all data again from books
      const fetchBookData = async () => {
        let currentPage = 1;
        let allBooks: Book[] = [];

        while (currentPage <= totalBookPages) {
          const result = await dispatch(getAllBooks(currentPage));

          if (getAllBooks.fulfilled.match(result)) {
            const { books } = result.payload;
            allBooks = [...allBooks, ...books];
            currentPage += 1;
          } else {
            break;
          }
        }

        dispatch(setAllBooks(allBooks));
      };

      fetchBookData();

      props.setOpen(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setCreatedData((prevData) => ({ ...prevData, [fieldName]: value }));

    if (fieldName === "authors") {
      setSelectedAuthorIds(value);
    } else if (fieldName === "genres") {
      setSelectedGenreIds(value);
    }
  };

  return (
    <CustomBox>
      <CustomModel>
        <CustomCloseButton onClick={() => props.setOpen(false)}>
          X
        </CustomCloseButton>
        <Typography variant="h4" color="white">
          Add new {props.slug}
        </Typography>
        <CustomForm onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <CustomFormItem key={column.field}>
                <CustomLabel>{column.headerName}</CustomLabel>
                {column.field === "authors" || column.field === "genres" ? (
                  <CustomSelect
                    multiple
                    value={
                      column.field === "authors"
                        ? selectedAuthorIds
                        : selectedGenreIds
                    }
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  >
                    {column.field === "authors"
                      ? authors.map((author: Author) => (
                          <MenuItem key={author._id} value={author._id}>
                            {author.name}
                          </MenuItem>
                        ))
                      : genres.map((genre: Genre) => (
                          <MenuItem key={genre._id} value={genre._id}>
                            {genre.title}
                          </MenuItem>
                        ))}
                  </CustomSelect>
                ) : (
                  <CustomInput
                    type={column.type}
                    placeholder={column.field}
                    value={createdData[column.field] || ""}
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  />
                )}
              </CustomFormItem>
            ))}

          <CustomSubmitButton type="submit" variant="outlined" color="primary">
            Submit
          </CustomSubmitButton>
        </CustomForm>
      </CustomModel>
    </CustomBox>
  );
};
