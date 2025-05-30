import axiosInstance from "./axiosInstance";

export const login = (username: string, password: string) =>
  axiosInstance.post(`/user/login`, { username, password });

export const logout = () => axiosInstance.post(`/user/logout`);

export const checkAuth = () => axiosInstance.get(`/user/check-auth`);