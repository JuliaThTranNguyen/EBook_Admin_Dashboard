import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';

import { DataTable } from "../../components/dataForm/displayData/DataTable";
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { currentGenretotalPages, getAllGenres, setAllGenres } from '../../redux/reducers/genresReducer';
import { Genre } from '../../types/Genre';
import { GenreColumns } from '../../constants/genreColumns';
import { AddOneGenre } from '../../components/dataForm/addData/AddOneGenre';
import { currentAccessToken } from '../../redux/reducers/authReducer';

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: 'primary',
  marginLeft: 15,
});

export const Genres = () => {
  const { genres, loading } = useAppSelector((state) => state.genre);
  const totalGenrePages: number = useAppSelector(currentGenretotalPages) ?? 3;
  const accessToken: string | null = useAppSelector(currentAccessToken);

  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
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
  }, [dispatch,totalGenrePages]);

  return (
    <Box className='authors'>
       <CustomBox>
      <Typography variant="h4" color="white">
      Genres
        <CustomButton onClick={() => setOpen(true)} variant="outlined" endIcon="+">
          Create new genres
        </CustomButton>
      </Typography>
      </CustomBox>
      {loading ? ("LOADING ... ") : (
        <DataTable slug='genres' columns={GenreColumns} rows={genres}/>
      )}
      {open && <AddOneGenre slug='genres' accessToken={accessToken} columns={GenreColumns} setOpen={setOpen}/>}
    </Box>
  )
}
