import {isProduction} from './env';

export const log = (...args: any[]) => {
  if (isProduction()) {
    console.log(...args);
  }
};
