import Fetch from "./axiosInstance"

const SetupInterceptors = (showBoundary: (error: any) => void) => {

    Fetch.interceptors.response.use(response => response, 
        error => {
            console.log(error.response.status);
            if (error.response.status === 401)
                console.log("Нет доступа");
                //showBoundary("У вас нет доступа к этому ресурсу!");
            return Promise.reject(error);
        }
    );
}

export default SetupInterceptors;
