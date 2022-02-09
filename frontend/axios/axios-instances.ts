import axios, {AxiosInstance} from "axios";
import {Agent} from "https";
import {baseURL} from "../configs/globals";
import {getCookieValueClient} from "../utils/cookies-helpers";

const client_axios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization:
        //     "Bearer " + getCookieValueClient("token", document?.cookie),
    },
    httpsAgent: new Agent({rejectUnauthorized: false}),
});

// client_axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         console.log("in client axios interceptor \n" + error);
//         return Promise.reject(error);
//     },
// );

const server_axios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    httpsAgent: new Agent({rejectUnauthorized: false}),
    withCredentials: true,
});

server_axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("in server axios interceptor \n" + error);
        return Promise.reject(error);
    },
);

export {client_axios, server_axios};
