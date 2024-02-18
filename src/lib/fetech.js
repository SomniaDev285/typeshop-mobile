import axios from "axios";

export const baseUrl = process.env.API_URL || "http://localhost:5000";

export const publicAxios = axios.create({
  baseURL: `${baseUrl}/api`,
});

const authAxios = axios.create({
  baseURL: `${baseUrl}/api`,
});

export const authorizationProvider = (store) => {
  authAxios.interceptors.request.use((config) => {
    const token = store.getState().login.userInfo.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default authAxios;
