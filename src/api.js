import axios from "axios";

const api = axios.create({
  baseURL: "https://timetable-backend-e778.onrender.com/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const registerUser = async (name, email, password) => {
  const { data } = await api.post("/users/register", { name, email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await api.post("/users/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export default api;
