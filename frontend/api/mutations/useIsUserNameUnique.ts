import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";

export const getIsUserNameUnique = async (
    userName: string,
): Promise<ApiResult<boolean>> => {
    const response = await server_axios.get<ApiResult<boolean>>(
        `Users/IsUserNameUnique/${userName}`,
    );
    return response.data;
};

export const useIsUserNameUnique = () => {
    return useMutation(getIsUserNameUnique);
};
