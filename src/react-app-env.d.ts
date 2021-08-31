// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ENV: 'localhost' | 'development' | 'production';
    REACT_APP_API_ENDPOINT: string;
    REACT_APP_API_PREFIX: string;
  }
}
