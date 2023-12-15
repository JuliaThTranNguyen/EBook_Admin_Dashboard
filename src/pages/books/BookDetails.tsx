import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

import "./bookDetails.scss";
import { Book } from "../../types/Book";
import { currentAccessToken } from "../../redux/reducers/authReducer";
import useAppSelector from "../../hooks/useAppSelector";
import { BookColumns } from "../../constants/bookColumns";
import { EditBookData } from "../../components/dataForm/editData/EditBookData";
import { User } from "../../types/User";

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

export const BookDetails = () => {
  /*FETCHING DATA */
  const { loading } = useAppSelector((state) => state.book);

  const [bookData, setBookData] = useState<Book | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const { isbn } = useParams();
  const accessToken: string | null = useAppSelector(currentAccessToken);

  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  };

  const fetchOneBookData = async () => {
    try {
      const response = await axios.get(
        `https://nodejs-server-thjulia.vercel.app/api/v1/books/${isbn}`
      );

      setBookData(response.data.data);

      /*FETCHING USER DATA USING BORROWER ID*/
      const borrowerId = response.data.data?.borrowerId;
      if (borrowerId) {
        const userResponse = await axios.get(
          `https://nodejs-server-thjulia.vercel.app/api/v1/users/${borrowerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserData(userResponse.data.data);
      }
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`https://nodejs-server-thjulia.vercel.app/api/v1/books/${isbn}`)
      .then((response) => {
        setBookData(response.data.data);
      });
  }, [isbn]);

  /*HANDLE EDITING DATA */
  const handleEditSuccess = async () => {
    fetchOneBookData();
  };

  /*HANDLE LOADING DATA ... */
  if (loading || bookData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box className="singlePage">
        <Box>
          <TopInfo>
            {bookData?.image && <img src={bookData?.image} alt="Book Cover" />}
            <Typography variant="h4" color="white">
              {bookData?.title}
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
            Title:
            <CustomBody variant="body1" color="white">
              {bookData?.title}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            ISBN:
            <CustomBody variant="body1" color="white">
              {bookData?.isbn}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Authors:
            <CustomBody variant="body1" color="white">
              {bookData?.authors.length
                ? bookData.authors.map((author) => author.name).join(", ")
                : "N/A"}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Genres:
            <CustomBody variant="body1" color="white">
              {bookData?.genres.length
                ? bookData.genres.map((genre) => genre.title).join(", ")
                : "N/A"}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Publisher:
            <CustomBody variant="body1" color="white">
              {bookData?.publisher}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Published Date:
            <CustomBody variant="body1" color="white">
              {formatDate(bookData?.publishedDate)}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Status:
            <CustomBody variant="body1" color="white">
              {bookData?.status}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Borrower:
            <CustomBody variant="body1" color="white">
              {userData?.firstName && userData?.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : "N/A"}
            </CustomBody>
          </CustomTitle>
        </Box>
      </Box>

      <CustomReturnButton to="/books">Back to Books</CustomReturnButton>
      {open && (
        <EditBookData
          book={bookData}
          isbn={isbn}
          accessToken={accessToken}
          slug="users"
          columns={BookColumns}
          setOpen={setOpen}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
};
