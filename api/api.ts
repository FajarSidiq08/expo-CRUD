import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.110.167:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
