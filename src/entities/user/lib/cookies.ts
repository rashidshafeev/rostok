export const COOKIE_TOKEN_KEY = 'auth_token';

export const getTokenFromCookies = (): string | null => {
  // Implementation of getting token from cookies
  return (
    document.cookie.replace(
      /(?:(?:^|.*;\s*)auth_token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    ) || null
  );
};

export const saveTokenToCookies = (token: string): void => {
  document.cookie = `${COOKIE_TOKEN_KEY}=${token}; path=/; max-age=2592000`; // 30 days
};

export const removeTokenFromCookies = (): void => {
  document.cookie = `${COOKIE_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
