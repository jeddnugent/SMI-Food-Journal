import axios from "axios";
import type { User } from "../interfaces/User";
import type { Credentials } from "../interfaces/Credentials";
const API_URL = import.meta.env.VITE_API_URL;

export const login = (data: Credentials) =>
  axios.post(`${API_URL}/login`, data);


export const loginUser = (data: Credentials) =>
  axios.post(
    `${API_URL}/login`,
    data,
    {
      withCredentials: true, // 🔑 allow sending/receiving cookies
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

