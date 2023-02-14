import jwtDecode from 'jwt-decode';

export const generateFormEncodedBody = (body: any): string => {
  const formBody: any = [];
  for (const property in body) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

export const isValidToken = (token: string): boolean => {
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const decodeUsername = (token: string): string => {
  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.preferred_username;
  } catch (error) {
    return '';
  }
};

export const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string): any => {
  return localStorage.getItem(key);
};

export const clearTokens = (tokens: string[]): void => {
  tokens.forEach(token => {
    localStorage.removeItem(token);
  });
};
