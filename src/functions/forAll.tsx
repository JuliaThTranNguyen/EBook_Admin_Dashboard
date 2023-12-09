import axios from "axios";

export const deletebyId = async (
    id: string | undefined, 
    accessToken: string | null,
    slug: string | undefined, 
  ) => {
    try {
      const response = await axios.delete(
        `https://library.egorushque.space/api/v1/${slug}/${id}`,
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