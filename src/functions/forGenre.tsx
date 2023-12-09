import axios from 'axios';

export const updateGenre = async (
  id: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://library.egorushque.space/api/v1/genres/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error updating genre:', error);
    throw error;
  }
};

export const addGenre = async (
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.post(
      `https://library.egorushque.space/api/v1/genres`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Creating Genre:", data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating new genre:', error);
    throw error;
  }
};
