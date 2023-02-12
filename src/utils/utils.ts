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
