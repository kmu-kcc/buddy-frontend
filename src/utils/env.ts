import {User} from '../models/User';

export const isMaster = (user: User | null) => {
  return user?.id === 'MASTER';
};

export const getEnv = () => process.env.REACT_APP_ENV;

export const isProduction = () => getEnv() === 'production';
