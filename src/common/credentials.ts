import {Credentials} from '../models/User';

const ACCESS_TOKEN = 'access_token';
const EXPIRED_AT = 'expired_at';

export const isExpired = (expiredAt: string) => {
  return Date.now() < Number(expiredAt);
};

export const getCredentials = (): Credentials => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const expiredAt = localStorage.getItem(EXPIRED_AT);

  if (!(accessToken && expiredAt) || isExpired(expiredAt)) {
    localStorage.clear();
  }

  return {
    access_token: accessToken as string,
    expired_at: expiredAt as string,
  };
};

export const setCredentials = (credentials: Credentials) => {
  if (isExpired(credentials.expired_at)) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN, credentials.access_token);
  localStorage.setItem(EXPIRED_AT, credentials.expired_at);
};
