import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  currentAuthortotalPages,
  getAllAuthors,
} from "../../redux/reducers/authorsReducer";
import { Author } from "../../types/Author";

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

const CustomButton = styled(Button)({
  color: "primary",
  marginTop: 10,
});

export const AuthorBox = () => {
  const { authors, loading } = useAppSelector((state) => state.author);
  const totalPages: number = useAppSelector(currentAuthortotalPages) ?? 3;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let currentPage = 1;
      let allAuthor: Author[] = [];

      while (currentPage <= totalPages) {
        const result = await dispatch(getAllAuthors(currentPage));

        if (getAllAuthors.fulfilled.match(result)) {
          const { authors } = result.payload;
          allAuthor = [...allAuthor, ...authors];
          currentPage += 1;
        } else {
          break;
        }
      }
    };

    fetchData();
  }, [dispatch, totalPages]);

  const displayedAuthors = authors.slice(0, 6);

  const handleButtonClick = () => {
    navigate("/authors");
  };

  /*HANDLE LOADING DATA ... */
  if (loading || authors === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <Typography variant="h5" color="white">
          <LibraryBooksIcon /> Total Authors: {authors.length}
        </Typography>
      </Box>
      {displayedAuthors.map((author) => (
        <CustomPaper key={author._id}>
          <AvatarContainer>
            <Avatar alt={author.name} src={author.image} />
          </AvatarContainer>
          <UserInfoContainer>
            <CustomTypographyBold variant="subtitle1">
              {author.name}{" "}
            </CustomTypographyBold>
          </UserInfoContainer>
        </CustomPaper>
      ))}
      <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="→">
        View all
      </CustomButton>
    </>
  );
};
