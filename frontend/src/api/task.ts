import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


export const fetchAllTasks = async (token: string) => {
  try {
    let res = await axios.get(`${BASE_URL}/task/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  }
};

export const createTask = async (taskData: any, token: string) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/task/create`,
      { ...taskData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  }
};

export const deleteTask = async (id: string, token: string) => {
  try {
    let res = await axios.delete(`${BASE_URL}/task/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  }
};

export const editTask = async (
  id: string,
  token: string,
  updatedTask: any,
) => {
  try {
    let res = await axios.put(`${BASE_URL}/task/${id}`, updatedTask, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  } finally {
  }
};
