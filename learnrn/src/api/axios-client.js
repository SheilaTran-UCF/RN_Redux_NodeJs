import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5001/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async error => {
    return Promise.reject(error);
  },
);

export default axiosClient;
