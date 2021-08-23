import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_ENDPOINT}${process.env.REACT_APP_API_PREFIX}`;

export const request = axios.create({
  baseURL,
});
