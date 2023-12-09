import axios from 'axios';

export const updateBook = async (
  isbn: string | undefined,
  data: Record<string, any>, 
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://library.egorushque.space/api/v1/books/${isbn}`,
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
      `https://library.egorushque.space/api/v1/books`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
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
      `https://library.egorushque.space/api/v1/books/${isbn}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error deleting a book:', error);
    throw error;
  }
};
