import axios from "axios";

export const Fetch = axios.create({
    baseURL: 'http://localhost:8555/',
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
})

Fetch.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        console.log("У вас нет доступа к этому ресурсу!");
      }
      else
      {
          console.log(error);
      }
      return Promise.reject(error);
    }
  );
  
export default Fetch;
  
   
  