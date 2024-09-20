// 'use server'
import { AuthResponse } from "@/types/User";
import axios from "axios";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

export const API_URL = process.env.REACT_APP_SERVER_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL || 'http://localhost:5000/api',
});

$api.interceptors.request.use((config) => {
  console.log(config, 'config')
  const accessToken = Cookies.get("accessToken");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${cookies().get("accessToken")}`;
    return config;
  },
  async (error) => {
    const originalRequest = error.config; // записываем наш запрос
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        // cookies().set("accessToken", `${response?.data?.accessToken}`);
        Cookies.set('accessToken', `${response?.data?.accessToken}`)
        return $api.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("user");
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('currentUser')

        console.log("No register, [in interceptors error]", error);
      }
    }
  }
);

export default $api;
