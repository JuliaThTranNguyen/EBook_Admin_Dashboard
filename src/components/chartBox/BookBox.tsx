import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Book } from "../../types/Book";
import {
  currentBooktotalPages,
  getAllBooks,
  setAllBooks,
} from "../../redux/reducers/booksReducer";

const CustomPaper = styled(Paper)({
  marginTop: 10,
  backgroundColor: "#2f3b50",
  border: "1px solid #2f3b50",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "16px",
});

const AvatarContainer = styled("div")({
  marginRight: "16px",
  marginLeft: 15,
});

const UserInfoContainer = styled("div")({
  flex: 1,
  marginLeft: 15,
});

const CustomTypographyBold = styled(Typography)({
  margin: 5,
  color: "white",
  fontWeight: "bold",
});

const CustomTypography = styled(Typography)({
  margin: 5,
  color: "white",
});

const CustomButton = styled(Button)({
  color: "primary",
  marginTop: 10,
});

export const BookBox = () => {
  const { books, loading } = useAppSelector((state) => state.book);
  const totalPages: number = useAppSelector(currentBooktotalPages) ?? 3;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(setAllBooks(allBooks));
    };

    fetchData();
  }, [dispatch, totalPages]);

  const displayedBooks = books.slice(0, 4);

  const handleButtonClick = () => {
    navigate("/books");
  };

  /*HANDLE LOADING DATA ... */
  if (loading || books === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <Typography variant="h5" color="white">
          <LibraryBooksIcon /> Total Books: {books.length}
        </Typography>
      </Box>
      <Box>
        {displayedBooks.map((book) => (
          <CustomPaper key={book._id}>
            <AvatarContainer>
              <Avatar alt={book.title} src={book.image} />
            </AvatarContainer>
            <UserInfoContainer>
              <CustomTypographyBold variant="subtitle1">
                {book.title}{" "}
              </CustomTypographyBold>
              <CustomTypography variant="body2">{book.status}</CustomTypography>
            </UserInfoContainer>
          </CustomPaper>
        ))}
      </Box>
      <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="→">
        View all
      </CustomButton>
    </>
  );
};
