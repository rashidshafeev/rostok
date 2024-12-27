import Cookies from 'js-cookie';

export const saveTokenToCookies = (token: string): void => {
  if (token) {
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
  } else {
    Cookies.remove('token');
  }
};

export const getTokenFromCookies = (): string | null => {
  return Cookies.get('token') || null;
};
