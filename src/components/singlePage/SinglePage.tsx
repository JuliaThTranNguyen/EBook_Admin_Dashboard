import {
  Box,
  Typography,
  Button,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "@emotion/styled";
import "./singlePage.scss";
import { Link } from 'react-router-dom';

const TopInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 25,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
  marginBottom: 15,
});

const CustomListData = styled(List)({
  paddingTop: 20,
  paddingBottom: 20,
});

const CustomListItemData = styled(ListItemText)({
  display: "flex",
  gap: 0,
});

type UserDetailsProps = {
  user: {
    id: number;
    image: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
};

export const SinglePage: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Box className="singlePage">
      <Box>
        <TopInfo>
          {user.image && <img src={user.image} alt="image" />}
          <Typography variant="h4" color="white">
            {user.username}
          </Typography>
          <CustomButton variant="outlined" endIcon="✓">
            Edit Data
          </CustomButton>
        </TopInfo>
        <Typography variant="body1" color="white">
          First Name: {user.firstName}
        </Typography>
        <Typography variant="body1" color="white">
          Last Name: {user.lastName}
        </Typography>
        <Typography variant="body1" color="white">
          Email: {user.email}
        </Typography>
        <Typography variant="body1" color="white">
          Role: {user.role}
        </Typography>
        <Button component={Link} to="/users" variant="outlined" color="primary">
          Back to Users
        </Button>
      </Box>
    </Box>
  );
};
