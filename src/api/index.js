import axios from "axios";
export const API_URl = 'http://147.45.109.174:8000/'
// export const API_URl = 'http://localhost:8080/api';
export const $api = axios.create({
  withCredentials: false,
  baseURL: API_URl,
  validateStatus: (status) => status >= 200 && status <= 500
})

$api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// $api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})