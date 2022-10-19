import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {"Content-Type": "application/json"}
  });
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `${token}` : '';
    return config;
  });
  export default instance;