import axios from 'axios';

export const updateBook = async (
  isbn: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://nodejs-server-thjulia.vercel.app/api/v1/books/${isbn}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error updating books:', error);
    throw error;
  }
};

export const addBook = async (
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.post(
      `https://nodejs-server-thjulia.vercel.app/api/v1/books`,
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
    console.error('Error creating new book:', error);
    throw error;
  }
};

export const deleteOneBook = async (
  isbn: string | undefined, 
  accessToken: string | null
) => {
  try {
    const response = await axios.delete(
      `https://nodejs-server-thjulia.vercel.app/api/v1/books/${isbn}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    alert("Oops! There might be something wrong. Please refresh and try again.")
    console.error('Error deleting a book:', error);
    throw error;
  }
};
