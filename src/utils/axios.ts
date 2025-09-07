import axios, { AxiosError, AxiosInstance, AxiosResponse, Method, AxiosHeaders } from "axios";
import { getData } from "./localStorage";


export const BACKEND_HOST: string = http://13.233.86.114:8000/api/";
// export const BACKEND_HOST: string = "http://localhost:8000/api/";

const instanceWithToken: AxiosInstance = axios.create({
    baseURL: BACKEND_HOST,
    timeout: 60000,
    headers: {
        Authorization: `Bearer ${getData("accessToken") || ""}`,
    },
});

const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_HOST,
    timeout: 60000,
});

const refreshToken = async (): Promise<string | null> => {
    const response: AxiosResponse<{ access: string }> = await axios.post(
        `${BACKEND_HOST}auth/refresh/`,
        {
            refresh: getData("refreshToken"),
        }
    );
    return response.data.access;
};

instanceWithToken.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401 && error.config) {
                try {
                    const newAccessToken = await refreshToken();
                    if (newAccessToken) {
                        localStorage.setItem("accessToken", newAccessToken);
                        if (error.config.headers) {
                            (error.config.headers as AxiosHeaders).set("Authorization", `Bearer ${newAccessToken}`);
                        } else {
                            error.config.headers = new AxiosHeaders({ Authorization: `Bearer ${newAccessToken}` });
                        }
                        return axios(error.config);
                    } else {
                        localStorage.clear();
                        // window.location.href = "/login";
                    }
                } catch (refreshError) {
                    localStorage.clear();
                    // window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

type LoadingStateSetter = (loading: boolean) => void;
type SuccessHandler<T> = (data: T) => void;
type ErrorHandler = (error: unknown) => void;

export const apiCallWithToken = async <T>(
    endpoint: string,
    body: unknown,
    method: Method,
    loadingState?: LoadingStateSetter,
    onSuccess?: SuccessHandler<T>,
    onError?: ErrorHandler
): Promise<void> => {
    if (loadingState) {
        loadingState(true);
    }
    try {
        const response: AxiosResponse<T> = await instanceWithToken.request<T>({
            url: endpoint,
            method,
            data: body,
        });
        if (loadingState) {
            loadingState(false);
        }
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (loadingState) {
            loadingState(false);
        }
        if (onError) {
            loadingState(false);
            onError(error);
        }
    }
};

export const apiCall = async <T>(
    endpoint: string,
    body: unknown,
    method: Method,
    loadingState: LoadingStateSetter,
    onSuccess: SuccessHandler<T>,
    onError: ErrorHandler
): Promise<void> => {
    loadingState(true);
    try {
        const response: AxiosResponse<T> = await instance.request<T>({
            url: endpoint,
            method,
            data: body,
        });
        loadingState(false);
        onSuccess(response.data);
    } catch (error) {
        loadingState(false);
        onError(error);
    }
};

export default apiCallWithToken;

