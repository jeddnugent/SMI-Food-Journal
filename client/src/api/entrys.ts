import axiosInstance from "./axiosInstance";
import type { Entry } from "../interfaces/Entry";


export const getAllUserEntrys = (userId: string) =>
  axiosInstance.get(`/entry/${userId}/`);

export const getSpecificUserEntry = (userId: string, id: number) =>
  axiosInstance.post(`/entry/${userId}/${id}`);

export const getAllUserEntrysDate = (userId: string, date: string) =>
  axiosInstance.get(`/entry/date/${userId}/${date}`);

export const postNewEntry = (userId: string, data: Entry) =>
  axiosInstance.post(`/entry/${userId}`, data);

export const updateEntry = (userId: string, id: number, data: Entry) =>
  axiosInstance.put(`/entry/${userId}/${id}`, data);

export const deleteUserEntry = (userId: string, id: number) =>
  axiosInstance.delete(`/entry/${userId}/${id}`);