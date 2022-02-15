import {AxiosResponse} from "axios";
import {useMutation, UseMutationOptions} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {IRegisterData} from "../../types/data/auth";
import {PartialUserWithToken} from "../../types/data/user";

type HandleRegisterType = (
    data: IRegisterData,
) => Promise<ApiResult<PartialUserWithToken>>;

export const handleRegister: HandleRegisterType = async (data: IRegisterData) => {
    const response: AxiosResponse<
        ApiResult<PartialUserWithToken>,
        any
    > = await server_axios.post("Auth/Register", data);
    return response.data;
};

export const useRegister = () => {
    return useMutation(handleRegister);
};
