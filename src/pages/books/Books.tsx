import React,{ useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';

import "./books.scss"
import useAppSelector from '../../hooks/useAppSelector';
import {  currentBooktotalPages, getAllBooks, setAllBooks } from '../../redux/reducers/booksReducer';
import useAppDispatch from '../../hooks/useAppDispatch';
import { BookTable } from '../../components/dataForm/displayData/BookTable';
import { BookColumns } from '../../constants/bookColumns';
import { AddOneBook } from '../../components/dataForm/addData/AddOneBook';
import { currentAccessToken } from '../../redux/reducers/authReducer';
import { Book } from '../../types/Book';

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
});

export const Books = () => {
const { books, loading } = useAppSelector((state) => state.book);
const totalPages: number = useAppSelector(currentBooktotalPages) ?? 3;

  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch();
  const accessToken: string | null = useAppSelector(currentAccessToken);

  useEffect(() => {
    const fetchData = async () => {
      let currentPage = 1;
      let allBooks: Book[] = [];
  
      while (currentPage <= totalPages) {
        const result = await dispatch(getAllBooks(currentPage));
  
        if (getAllBooks.fulfilled.match(result)) {
          const { books } = result.payload;
          allBooks = [...allBooks, ...books];
          currentPage += 1;
        } else {
          break; 
        }
      }
      console.log("book is fetching datas")
      dispatch(setAllBooks(allBooks));
    };
  
    fetchData();
  }, [dispatch, totalPages]);

  return (
    <Box className='products'>
      <CustomBox>
      <Typography variant="h4" color="white">
        Books
        <CustomButton onClick={() => setOpen(true)} variant="outlined" endIcon="+">
          Create new Book
        </CustomButton>
      </Typography>
      </CustomBox>
      {loading ? ("LOADING ... ") : (
        <BookTable slug='books' columns={BookColumns} rows={books}/>
      )}
      {open && <AddOneBook slug='books' accessToken={accessToken} columns={BookColumns} setOpen={setOpen}/>}
    </Box>
  )
}
