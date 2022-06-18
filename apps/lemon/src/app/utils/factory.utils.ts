export const getAvatarUrl = (url: string, size: number = 96): string => {
  return url.replace(/=s96/i, `=s${size}`);
};
