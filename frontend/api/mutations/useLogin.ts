import {AxiosResponse} from "axios";
import {useMutation, UseMutationOptions} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {ILoginData} from "../../types/data/auth";
import {PartialUserWithToken} from "../../types/data/user";

type HandleLoginType = (
    data: ILoginData,
) => Promise<ApiResult<PartialUserWithToken>>;

type HandleLoginWithTokenType = (
    token: string,
) => Promise<ApiResult<PartialUserWithToken>>;

export const handleLogin: HandleLoginType = async (data: ILoginData) => {
    const response: AxiosResponse<
        ApiResult<PartialUserWithToken>,
        any
    > = await server_axios.post("Auth/Login", data);
    return response.data;
};

export const handleLoginWithToken: HandleLoginWithTokenType = async (
    token: string,
) => {
    const response: AxiosResponse<
        ApiResult<PartialUserWithToken>,
        any
    > = await server_axios.get("Auth/LoginWithToken", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useLogin = () => {
    return useMutation(handleLogin);
};
