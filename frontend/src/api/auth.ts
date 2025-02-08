import axios from "axios";
import { LoginUserPayload, RegisterUserPayload } from "../utils/types";
const BASE_URL = import.meta.env.VITE_API_URL;


export const registerUser = async (userData: RegisterUserPayload) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/register`, userData);
    return res.data;
  } catch (error: any) {
    return error?.response?.data.message;
  }
};

export const loginUser = async (userData: LoginUserPayload) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, userData);
    // console.log(res,"resss");
    return res.data;
  } catch (error: any) {
    return error?.response?.data.message;
  }
};

export const logoutUser = async (token: string) => {
  try {
    let res = await axios.get(`${BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data.message;
  }
};
