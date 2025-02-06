import axios from "axios";
// import axiosInstance from "../utils/axiosInstance";
// const BASE_URL = "https://schedulify-cgr9.onrender.com";
const BASE_URL = "http://localhost:8080";

// export const fetchAllTasks = async() => {
//     try {
//         let res = await axiosInstance.get("/task/")
//         // console.log(res)
//         return res.data;
//     } catch (error) {
//         console.log(error)
//     }
// }

export const fetchAllTasks = async (token: string) => {
  try {
    let res = await axios.get(`${BASE_URL}/task/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    console.log(error);
    return error.response.data.message
  }
};

export const createTask = async (taskData:any,token: string) => {
  try {
    let res = await axios.post(`${BASE_URL}/task/create/`,taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error:any) {
    console.log(error);
    return error.response.data.message
  }
};

export const deleteTask = async (id:string,token: string) => {
  try {
    let res = await axios.delete(`${BASE_URL}/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    console.log(error);
    return error.response.data.message
  }
};
