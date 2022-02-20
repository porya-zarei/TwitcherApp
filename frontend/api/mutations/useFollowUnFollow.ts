import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";

interface IFollowUnFollowData {
    userName: string;
    token: string;
    follow: boolean;
}

export const handleFollowUnFollow = async (
    data: IFollowUnFollowData,
): Promise<ApiResult<boolean>> => {
    const response = await server_axios.post(
        `users/${data.follow ? "Follow" : "UnFollow"}/${data.userName}`,
    );
    return response.data;
};

export const useFollowUnFollow = () => {
    return useMutation(handleFollowUnFollow);
};
