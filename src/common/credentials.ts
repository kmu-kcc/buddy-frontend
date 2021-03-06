import {Credentials} from '../models/User';

const ACCESS_TOKEN = 'access_token';
const EXPIRED_AT = 'expired_at';
const USER_ID = 'user_id';
const USER_PW = 'user_pw';
const SIGNIN_USER_ID = 'signin_user_id';

export const setSignInUserId = (userId: string) => {
  localStorage.setItem(SIGNIN_USER_ID, userId);
};

export const getSignInUserId = () => localStorage.getItem(SIGNIN_USER_ID) ?? '';

export const clearSignInUserId = () => localStorage.removeItem(SIGNIN_USER_ID);

export const clearCredentials = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(EXPIRED_AT);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_PW);
};

export const isExpired = (expiredAt: string) => {
  return Date.now() < Number(expiredAt);
};

export const getCredentials = (): Credentials | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const expiredAt = localStorage.getItem(EXPIRED_AT);

  if (!(accessToken && expiredAt) || isExpired(expiredAt)) {
    clearCredentials();
    return null;
  }

  return {
    access_token: accessToken,
    expired_at: expiredAt,
  };
};

export const setCredentials = (credentials: Credentials) => {
  if (isExpired(credentials.expired_at)) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN, credentials.access_token);
  localStorage.setItem(EXPIRED_AT, credentials.expired_at);
};

export const setCredentialInfo = (id: string, pw: string) => {
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USER_PW, pw);
};

export const getCredentialInfo = () => {
  const id = localStorage.getItem(USER_ID);
  const pw = localStorage.getItem(USER_PW);

  if (!(id && pw)) {
    clearCredentials();
    return null;
  }

  return {
    id,
    password: pw,
  };
};
