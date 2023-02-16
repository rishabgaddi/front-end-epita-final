import { createApiInstance } from './axios';

const apiInstance = createApiInstance();

export const getUser = async (username: string): Promise<any> => {
  try {
    const response = await apiInstance.get(`/users/info?username=${username}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
