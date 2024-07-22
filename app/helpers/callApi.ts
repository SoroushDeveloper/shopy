import axios, {AxiosRequestConfig} from "axios";
import ValidationError from "@/app/exceptions/validationError";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:6900/api'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true;
            return config;
        },
        err => {
            throw err
        }
    )

    axiosInstance.interceptors.response.use(
        res => {
            // manage validation
            return res;
        },
        err => {
            const res = err?.response
            if (res) {
                if (res.status === 422) {
                    throw new ValidationError(res.data.errors)
                }
            }
            throw err;
        }
    )

    return axiosInstance;
}

export default callApi;