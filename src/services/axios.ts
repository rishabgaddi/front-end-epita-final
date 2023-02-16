import axios, { AxiosInstance } from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from 'slices/authSlice';
import { Token } from 'types/Token';
import {
  generateFormEncodedBody,
  getLocalStorage,
  isValidToken,
  setLocalStorage,
} from 'utils/utils';
import { getTokens } from './auth';

const attachTokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (request: any) => {
    try {
      const token = getLocalStorage('token');
      if (!token || token === 'null') return request;
      if (!isValidToken(token)) {
        const refreshToken = getLocalStorage('refresh_token');
        if (!refreshToken) return request;
        const details = {
          grant_type: 'refresh_token',
          client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
          refresh_token: refreshToken,
        };
        const token: Token = await getTokens(generateFormEncodedBody(details));
        if (token) {
          const accessToken = token.access_token;
          request.headers.Authorization = `Bearer ${accessToken}`;
          setLocalStorage('token', accessToken);
          setLocalStorage('refresh_token', token.refresh_token);
          const dispatch = useDispatch();
          dispatch(setToken({ token: token }));
        }
      } else {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    } catch (error) {
      return Promise.reject(error);
    }
  });

  return instance;
};

export const createAuthInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URL + '/auth',
    withCredentials: true,
  });

  return instance;
};

export const createApiInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });

  return attachTokenInterceptor(instance);
};

export const createExpressInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_EXPRESS_BASE_URL,
    withCredentials: true,
  });

  return attachTokenInterceptor(instance);
};

export const createApiGatewayInstance = () => {
  const instance = axios.create({
    baseURL:
      process.env.REACT_APP_GATEWAY_URL +
      '/apiman-gateway/' +
      process.env.REACT_APP_GATEWAY_ORGANIZATION,
    withCredentials: true,
    headers: {
      'X-Api-Key': process.env.REACT_APP_GATEWAY_API_KEY,
    },
  });

  return attachTokenInterceptor(instance);
};
