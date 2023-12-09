import "./home.scss";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { TopBox } from "../../components/TopBox/TopBox";
import { AuthorBox } from "../../components/chartBox/AuthorBox";
import { BookBox } from "../../components/chartBox/BookBox";

const MainBox = styled(Box)({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "minmax(180px, auto)",
    gridAutoFlow: "dense",
});

const Box1 = styled(Box)({
  padding: 20,
  borderRadius: 10,
  border: "1px solid #425270",
  gridColumn: "span 1",
  gridRow: "span 4",
});

const Box2 = styled(Box)({
  padding: 20,
  borderRadius: 10,
  border: "1px solid #425270",
  gridColumn: "span 2",
  gridRow: "span 2",
});

export const Home = () => {
  return (
    <MainBox className="home">
      <Box1>
        <TopBox />
      </Box1>
      <Box2>
        <AuthorBox />
      </Box2>
      <Box2>
        <BookBox />
      </Box2>
    </MainBox>
  );
};
