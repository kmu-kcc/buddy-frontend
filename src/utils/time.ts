export const convertToSec = (time: number) => {
  return Number((time / 1000).toFixed(0));
};

export const convertToMillis = (time: string) => {
  return `${time}000`;
};
