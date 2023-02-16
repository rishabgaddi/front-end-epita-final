import { generateFormEncodedBody, getLocalStorage } from 'utils/utils';
import { createAuthInstance } from './axios';

const authInstance = createAuthInstance();

export const getTokens = async (body: any): Promise<any> => {
  try {
    const response = await authInstance.post(
      '/realms/' +
        process.env.REACT_APP_KEYCLOAK_REALM +
        '/protocol/openid-connect/token',
      body,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async (token: string): Promise<any> => {
  const body = {
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    refresh_token: token,
  };
  const formBody = generateFormEncodedBody(body);
  try {
    const response = await authInstance.post(
      '/realms/' +
        process.env.REACT_APP_KEYCLOAK_REALM +
        '/protocol/openid-connect/logout',
      formBody,
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (body: any): Promise<any> => {
  try {
    const response = await authInstance.post(
      '/admin/realms/' + process.env.REACT_APP_KEYCLOAK_REALM + '/users',
      body,
      {
        headers: {
          Authorization: 'Bearer ' + getLocalStorage('token'),
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (username: string): Promise<any> => {
  try {
    const response = await authInstance.get(
      '/admin/realms/' +
        process.env.REACT_APP_KEYCLOAK_REALM +
        '/users?username=' +
        username,
      {
        headers: {
          Authorization: 'Bearer ' + getLocalStorage('token'),
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resetPassword = async (
  userId: string,
  body: any,
): Promise<any> => {
  try {
    const response = await authInstance.put(
      '/admin/realms/' +
        process.env.REACT_APP_KEYCLOAK_REALM +
        '/users/' +
        userId +
        '/reset-password',
      body,
      {
        headers: {
          Authorization: 'Bearer ' + getLocalStorage('token'),
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
