import { createApiInstance } from './axios';

const apiInsatance = createApiInstance();

export const getRoles = async () => {
  try {
    const response = await apiInsatance.get('/roles');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
