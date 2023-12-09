import axios from 'axios';

export const updateUser = async (
  id: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://library.egorushque.space/api/v1/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const updateRole = async (
  id: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://library.egorushque.space/api/v1/users/${id}/role`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

export const addUser = async (
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.post(
      `https://library.egorushque.space/api/v1/auth/signup`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Creating User:", data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
};

