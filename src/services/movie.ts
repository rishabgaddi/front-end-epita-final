import { createApiGatewayInstance, createExpressInstance } from './axios';

const expressInstance = createExpressInstance();
const apiGatewayInstance = createApiGatewayInstance();

export const fetchMovie = async (id: string): Promise<any> => {
  try {
    const response = await expressInstance.get('/movies/id/' + id);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadMovie = async (body: any): Promise<any> => {
  try {
    const response = await expressInstance.post('/movies', body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadPoster = async (
  id: string,
  file: File,
  body: any,
): Promise<any> => {
  try {
    const response = await expressInstance.post(
      '/movies/id/' + id + '/poster',
      body,
      {
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': 'attachment; filename=' + file.name,
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadTrailer = async (
  id: string,
  file: File,
  body: any,
): Promise<any> => {
  try {
    const response = await expressInstance.post(
      '/movies/id/' + id + '/trailer',
      body,
      {
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': 'attachment; filename=' + file.name,
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchLatestMovies = async (): Promise<any> => {
  try {
    const response = await expressInstance.get('/movies/latest');
    // const response = await apiGatewayInstance.get(
    //   '/latestmovie/' + process.env.REACT_APP_GATEWAY_API_VERSION,
    // );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchSeenMovies = async (username: string): Promise<any> => {
  try {
    const response = await expressInstance.get('/movies/seen/user/' + username);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchTopWatchedMovies = async (): Promise<any> => {
  try {
    const response = await expressInstance.get('/movies/top/watched');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
