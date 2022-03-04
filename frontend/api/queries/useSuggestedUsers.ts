import {useQuery} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {PartialUser} from "../../types/data/user";

export const getSuggestedUsers = async (): Promise<
    ApiResult<PartialUser[]>
> => {
    const response = await server_axios.get<ApiResult<PartialUser[]>>(
        "Users/GetAllUsers",
    );
    return response.data;
};

export const useSuggestedUsers = () => {
    return useQuery("suggestedUsers", getSuggestedUsers);
};