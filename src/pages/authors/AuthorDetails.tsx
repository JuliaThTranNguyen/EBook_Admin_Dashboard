import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

import { Author } from "../../types/Author";
import { EditAuthorData } from "../../components/dataForm/editData/EditAuthorData";
import { AuthorColumns } from "../../constants/authorColumns";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

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

export const AuthorDetails = () => {
  /*FETCHING DATA */
  const dispatch = useAppDispatch();
  const [authorData, setAuthorData] = useState<Author | null>(null);
  const { loading } = useAppSelector((state) => state.author);

  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const fetchOneAuthorData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://nodejs-server-thjulia.vercel.app/api/v1/authors/${id}`
      );

      setAuthorData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
    
  }, [id]);

  useEffect(() => {
    fetchOneAuthorData();
  }, [dispatch,fetchOneAuthorData, id]);

  /*EDIT DATA */
  const handleEditSuccess = async () => {
    fetchOneAuthorData();
  };

  /*HANDLE LOADING DATA ... */
  if (loading || authorData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box className="singlePage">
        <Box>
          <TopInfo>
            {authorData?.image && (
              <img src={authorData?.image} alt="Author Avatar" />
            )}
            <Typography variant="h4" color="white">
              {authorData?.name}
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
              {authorData?.bio}
            </CustomBody>
          </CustomTitle>
        </Box>
      </Box>
      <CustomReturnButton to="/authors">Back to Authors</CustomReturnButton>
      {open && (
        <EditAuthorData
          author={authorData}
          id={id}
          slug="authors"
          columns={AuthorColumns}
          setOpen={setOpen}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
};
