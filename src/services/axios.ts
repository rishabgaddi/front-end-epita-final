import axios from 'axios';
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

axios.interceptors.request.use(async (request: any) => {
  try {
    const token =
      request.headers.Authorization &&
      request.headers.Authorization.split(' ')[1];
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
    }
    return request;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_KEYCLOAK_URL,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Access-Control-Allow-Origin': '*',
  // },
});

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export const expressInstance = axios.create({
  baseURL: process.env.REACT_APP_EXPRESS_BASE_URL,
  withCredentials: true,
});
