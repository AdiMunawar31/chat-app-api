export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-US', { hour12: true });
};
