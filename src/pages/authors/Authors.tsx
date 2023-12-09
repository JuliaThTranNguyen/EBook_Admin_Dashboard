import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { DataTable } from "../../components/dataForm/displayData/DataTable";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  currentAuthortotalPages,
  getAllAuthors,
  setAllAuthors,
} from "../../redux/reducers/authorsReducer";
import { Author } from "../../types/Author";
import { AuthorColumns } from "../../constants/authorColumns";
import { AddOneAuthor } from "../../components/dataForm/addData/AddOneAuthor";
import { currentAccessToken } from "../../redux/reducers/authReducer";

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
});

export const Authors = () => {
  const { authors, loading } = useAppSelector((state) => state.author);
  const totalPages: number = useAppSelector(currentAuthortotalPages) ?? 3;

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessToken: string | null = useAppSelector(currentAccessToken);

  useEffect(() => {
    const fetchData = async () => {
      let currentPage = 1;
      let allAuthors: Author[] = [];

      while (currentPage <= totalPages) {
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

    fetchData();
  }, [dispatch, totalPages]);

  return (
    <Box className="authors">
      <CustomBox>
        <Typography variant="h4" color="white">
          Authors
          <CustomButton
            onClick={() => setOpen(true)}
            variant="outlined"
            endIcon="+"
          >
            Create new author
          </CustomButton>
        </Typography>
      </CustomBox>
      {loading ? (
        "LOADING ... "
      ) : (
        <DataTable slug="authors" columns={AuthorColumns} rows={authors} />
      )}
      {open && <AddOneAuthor slug='authors' accessToken={accessToken} columns={AuthorColumns} setOpen={setOpen}/>}
    </Box>
  );
};
