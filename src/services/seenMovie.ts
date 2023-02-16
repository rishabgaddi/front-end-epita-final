import { createApiInstance } from './axios';

const apiInstance = createApiInstance();

export const addSeenMovie = async (
  date: string,
  movieId: string,
  username: string,
): Promise<any> => {
  try {
    const response = await apiInstance.post(`/seenmovies`, {
      date,
      movieId,
      username,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
