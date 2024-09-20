
import { AxiosResponse } from "axios";
// import { cookies } from "next/headers";
import { AuthResponse, IResetPassword, IUser, IUserAuth } from "@/types/User";
import $api from "@/http";
import Cookies from "js-cookie";

export const Sign_in = async (data: IUserAuth): Promise<AuthResponse> => {
  try {
    const response = await $api.post(`/auth/sign_in`, data);
    if (!response?.data) {
      throw new Error("Invalid email or password");
    }
    Cookies.set("accessToken", `${response?.data?.accessToken}`);
    Cookies.set("refreshToken", `${response?.data?.refreshToken}`);

    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const Sign_up = async (
  data: IUserAuth
): Promise<AxiosResponse<AuthResponse>> => {
  try {
    const response = await $api.post(`/auth/register`, data);

    if (response && response.data) {
      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        return response.data;
      } else {
        throw new Error(
          "Полученные данные не содержат accessToken или refreshToken."
        );
      }
    } else {
      throw new Error("Пользователь с такой почтой существует");
    }
  } catch (error: any) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await $api.post(`/auth/logout`);

    // cookies().delete("accessToken");
    // cookies().delete("refreshToken");
    // cookies().delete("currentUser");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("currentUser");
    console.log(response.data, "response.data");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const checkAuth = async (): Promise<AuthResponse> => {
  //один раз при монтировании в useffect при условии что в куках есть что то вызываем эту ф-ю
  try {
    const response = await $api.get<AuthResponse>(`/auth/refresh`, {
      withCredentials: true,
    });
    // cookies().set("accessToken", `${response?.data?.accessToken}`);
    Cookies.set("accessToken", `${response?.data?.accessToken}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await $api.get<IUser[]>(`/auth/users`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<string> => {
  try {
    const response = await $api.post(`/auth/forgot-password`, {
      email,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: IResetPassword): Promise<string> => {
  const { id, token, password } = data;

  try {
    const response = await $api.post(`/auth/reset-password/${id}/${token}`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error resetting password: ${error}`);
  }
};
