import axios from "axios";
import store from "../redux/store";

const getToken = () => {
  const { token } = store.getState().user || store.getState().admin;
  return token;
};

const api = axios.create({
  baseURL: "https://it4um-server.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
