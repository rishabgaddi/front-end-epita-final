import { expressInstance } from './axios';

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
      '/movies/' + id + '/poster',
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
      '/movies/' + id + '/trailer',
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
