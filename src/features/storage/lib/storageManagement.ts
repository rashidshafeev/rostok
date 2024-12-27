export const saveToSessionStorage = (key: string, data: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getFromSessionStorage = (key: string): unknown => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
