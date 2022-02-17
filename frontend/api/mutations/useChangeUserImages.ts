import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {
    IUserImagesChangedData,
    IUserImagesChangedResult,
} from "../../types/data/user";

export const handleChangeUserImages = async (
    data: IUserImagesChangedData,
): Promise<ApiResult<IUserImagesChangedResult>> => {
    const response: ApiResult<IUserImagesChangedResult> =
        await server_axios.post("Users/UpdateUserImages", data.data, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
    return response;
};

export const useChangeUserImages = () => {
    return useMutation(handleChangeUserImages);
};
