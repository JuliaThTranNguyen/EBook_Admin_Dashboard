import axios from 'axios';

export const updateAuthor = async (
  id: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://nodejs-server-thjulia.vercel.app/api/v1/authors/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    alert("Oops! There might be something wrong. Please refresh and try again.")
    console.error('Error updating author:', error);
    throw error;
  }
};

export const addAuthor = async (
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.post(
      `https://nodejs-server-thjulia.vercel.app/api/v1/authors`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    alert("Oops! There might be something wrong. Please refresh and try again.")
    console.error('Error creating new author:', error);
    throw error;
  }
};

