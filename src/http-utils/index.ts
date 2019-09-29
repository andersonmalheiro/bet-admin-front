import axios, { AxiosInstance } from 'axios';
require('dotenv').config();

const _baseURL: string =
  process.env.REACT_APP_DEV_SERVER_URL || process.env.REACT_APP_PROD_SERVER_URL;

console.log(
  process.env.REACT_APP_DEV_SERVER_URL || process.env.REACT_APP_PROD_SERVER_URL
);

export function setToken(token: string | any) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

const httpClient: AxiosInstance = axios.create({
  baseURL: _baseURL
});

export default httpClient;
