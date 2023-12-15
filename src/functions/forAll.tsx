import axios from "axios";

export const deletebyId = async (
    id: string | undefined, 
    accessToken: string | null,
    slug: string | undefined, 
  ) => {
    try {
      const response = await axios.delete(
        `https://nodejs-server-thjulia.vercel.app/api/v1/${slug}/${id}`,
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


  export const fetchBySlug = async (
    accessToken: string | null,
    slug: string | undefined, 
  ) => {
    try {
      const response = await axios.delete(
        `https://nodejs-server-thjulia.vercel.app/api/v1/${slug}`,
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


