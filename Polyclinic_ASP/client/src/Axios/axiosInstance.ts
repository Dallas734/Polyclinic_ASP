import axios from "axios";
import { notification } from "antd";

const Fetch = axios.create({
  baseURL: "http://localhost:8555/",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

Fetch.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      notification.error({
        message: "У вас нет доступа к этому ресурсу! Зарегистрируйтесь или войдите в аккаунт!",
        placement: "topRight",
        duration: 100,
      });
      console.log("У вас нет доступа к этому ресурсу!");
    }
    else
    {
        console.log(404);
    }
    return Promise.reject(error);
  }
);

export default Fetch;
