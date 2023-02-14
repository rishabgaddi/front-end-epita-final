import { apiInstance } from './axios';

export const getUser = async (
  username: string,
  token: string,
): Promise<any> => {
  try {
    const response = await apiInstance.get(`/users/info?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
