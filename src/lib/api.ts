import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send/receive httpOnly cookie
  headers: { "Content-Type": "application/json" },
});

export default api;
