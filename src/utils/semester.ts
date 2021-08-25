export const getCurrentSemester = () => {
  const date = new Date();
  return {
    semester: date.getMonth() < 8 ? 1 : 2,
    year: date.getFullYear(),
  };
};
