import axios from "axios";

const API = axios.create({
  baseURL: "https://placement-management-system-77mf.onrender.com/api",
  withCredentials: true,  // backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
