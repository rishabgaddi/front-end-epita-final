import { apiInstance } from './axios';

export const getUser = async (email: string, token: string): Promise<any> => {
  try {
    const response = await apiInstance.get(`/users/info?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
