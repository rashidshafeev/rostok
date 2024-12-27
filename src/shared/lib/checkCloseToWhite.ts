export const checkCloseToWhite = (color: string): boolean => {
  if (!color) return;

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return r > 200 && g > 200 && b > 200;
};
