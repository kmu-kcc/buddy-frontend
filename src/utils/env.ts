import {User} from '../models/User';

export const isMaster = (user: User | null) => {
  return user?.id === 'MASTER';
};
