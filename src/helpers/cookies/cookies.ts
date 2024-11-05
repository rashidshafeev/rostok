import Cookies from "js-cookie";

export const saveTokenToCookies = (token: string): void => {
  if (token) {
    Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
  } else {
    Cookies.remove("token");
  }
};

export const getTokenFromCookies = (): string | null => {
  return Cookies.get("token") || null;
};

export const saveToSessionStorage = (key: string, data: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getFromSessionStorage = (key: string): unknown => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
