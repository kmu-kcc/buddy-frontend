import {Semester} from '../models/Fee';

export const getCurrentSemester = (): Semester => {
  const date = new Date();
  return {
    semester: date.getMonth() < 8 ? 1 : 2,
    year: date.getFullYear(),
  };
};
