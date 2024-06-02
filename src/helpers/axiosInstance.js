//Globally protect routes by automatically adding the authentication token to all requests

import axios from "axios";
import { useRouter } from "next/navigation";

// Create an axios instance
const axiosInstance = axios.create({
  baseUrl: 'http://localhost:8080/api',
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  config => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;

  },
  error => {
    return Promise.reject(error);
  }
);


// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  response => response,

  error => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      useRouter().push('/login');
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;