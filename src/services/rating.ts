import { expressInstance } from './axios';

export const fetchRatingByMovieIdAndUsername = async (
  movieId: string,
  username: string,
): Promise<any> => {
  try {
    const response = await expressInstance.get(
      '/ratings/movie/' + movieId + '/user/' + username,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postRating = async (body: any): Promise<any> => {
  try {
    const response = await expressInstance.post('/ratings', body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putRating = async (id: string, body: any): Promise<any> => {
  try {
    const response = await expressInstance.put('/ratings/' + id, body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTopMovies = async (): Promise<any> => {
  try {
    const response = await expressInstance.get('/ratings/top/movies');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
