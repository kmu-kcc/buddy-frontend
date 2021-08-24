import axios, {AxiosInstance} from 'axios';
import {getCredentials} from '../../common/credentials';

const baseURL = `${process.env.REACT_APP_API_ENDPOINT}${process.env.REACT_APP_API_PREFIX}`;

let request: AxiosInstance;

export const getRequest = (): AxiosInstance => {
  if (!request) {
    createInstance();
  }

  return request;
};

export const createInstance = () => {
  request = axios.create({
    baseURL,
    headers: {
      Authorization: getCredentials().access_token,
    }
  });
};
