import Cookies from 'js-cookie';

export const saveTokenToCookies = (token) => {
    if (token) {
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
    } else {
      Cookies.remove('token');
    }
  };
  
export const getTokenFromCookies = () => {
    return Cookies.get('token') || null;
  };