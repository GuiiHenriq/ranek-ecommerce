import axios from "axios";

const urlServer = 'http://oyqj5vig.srv-45-34-12-248.webserverhost.top/wp-json';
//const urlLocal = 'http://localhost/wordpress/index.php/wp-json';

const axiosInstance = axios.create({
  baseURL: urlServer + "/api"
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    //return axios.post("http://localhost/wordpress/index.php/jwt-auth/v1/token", body);
    return axios.post(urlServer + "/jwt-auth/v1/token", body);
  },
  validateToken() {
    //return axiosInstance.post("http://localhost/wordpress/index.php/jwt-auth/v1/token/validate");
    return axiosInstance.post(urlServer + "/jwt-auth/v1/token/validate");
  }
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
