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

export const createUserAccount = async (body: any): Promise<any> => {
  try {
    const response = await apiInstance.post('/account/create', body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
