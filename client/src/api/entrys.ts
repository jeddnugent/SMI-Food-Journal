import axios from "axios";
import type { Entry } from "../interfaces/Entry";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUserEntrys = (userId: string) =>
  axios.get(`${API_URL}/entry/${userId}/`);

export const getSpecificUserEntry = (userId: string, id: number) =>
  axios.post(`${API_URL}/entry/${userId}/${id}`);

export const getAllUserEntrysDate = (userId: string, date: string) =>
  axios.get(`${API_URL}/entry/date/${userId}/${date}`);

export const postNewEntry = (userId: string, data: Entry) =>
  axios.post(`${API_URL}/entry/${userId}`, data);

export const updateEntry = (userId: string, id: number, data: Entry) =>
  axios.put(`${API_URL}/entry/${userId}/${id}`, data);

export const deleteEntry = (userId: string, id: number) =>
  axios.delete(`${API_URL}/entry/${userId}/${id}`);