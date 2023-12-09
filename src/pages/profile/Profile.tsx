import "./profile.scss"

import useAppSelector from '../../hooks/useAppSelector';
import {  currentAccessToken} from '../../redux/reducers/authReducer';
import { ProfileForm } from "../../components/dataForm/displayData/ProfileForm";

export const Profile = () => {
  const accessToken: string | null = useAppSelector(currentAccessToken);

  if (!accessToken) {
    return <div>No access token found.</div>;
  }

  return <ProfileForm />;
};

