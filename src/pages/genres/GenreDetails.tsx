import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";
import "./genreDetails.scss";
import styled from "@emotion/styled";

import { Genre } from "../../types/Genre";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { GenreColumns } from "../../constants/genreColumns";
import { EditGenreData } from "../../components/dataForm/editData/EditGenreData";

const TopInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 25,
  gap: 25,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
  marginBottom: 15,
});

const CustomTitle = styled(Typography)({
  display: "flex",
  marginTop: 15,
  gap: 10,
});

const CustomBody = styled(Typography)({
  marginLeft: 5,
  marginTop: 4,
});

const CustomReturnButton = styled(Link)({
  border: "1px solid lightblue",
  borderRadius: 15,
  color: "lightblue",
  marginTop: 20,
  padding: "15px 25px",
  textDecoration: "none",
  display: "inline-block",
});

export const GenreDetails = () => {
  /*FETCHING DATA */
  const dispatch = useAppDispatch();
  const [genreData, setGenreData] = useState<Genre | null>(null);
  const { loading } = useAppSelector((state) => state.genre);

  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const fetchOneGenreData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://nodejs-server-thjulia.vercel.app/api/v1/genres/${id}`
      );

      setGenreData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
    
  }, [id]);

  useEffect(() => {
    fetchOneGenreData();
  }, [dispatch,fetchOneGenreData, id]);

  /*EDIT DATA */
  const handleEditSuccess = async () => {
    fetchOneGenreData();
  };

  /*HANDLE LOADING DATA ... */
  if (loading || genreData === null) {
    return <div>Loading...</div>;
  }
  return (
    <Box>
      <Box className="singlePage">
        <Box>
          <TopInfo>
            <Typography variant="h4" color="white">
              {genreData?.title}
            </Typography>
            <CustomButton
              variant="outlined"
              onClick={() => setOpen(true)}
              endIcon="✓"
            >
              Edit Data
            </CustomButton>
          </TopInfo>
          <CustomTitle variant="h6" color="white">
            Bio:
            <CustomBody variant="body1" color="white">
              {genreData?.title}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Total books:
            <CustomBody variant="body1" color="white">
              {genreData?.booksCount}
            </CustomBody>
          </CustomTitle>
        </Box>
      </Box>
      <CustomReturnButton to="/genres">Back to Genres</CustomReturnButton>
      {open && (
        <EditGenreData
          genre={genreData}
          id={id}
          slug="genres"
          columns={GenreColumns}
          setOpen={setOpen}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
};
