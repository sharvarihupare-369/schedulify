import axios from "axios";
import { LoginUserPayload, RegisterUserPayload } from "../utils/types";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://schedulify-cgr9.onrender.com";

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
    console.log(res);
    return res.data;
  } catch (error: any) {
    return error?.response?.data.message;
  }
};
