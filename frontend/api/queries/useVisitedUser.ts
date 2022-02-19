import {useQuery} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {PartialUser} from "../../types/data/user";

interface IGetVistiedUser {
    (userName: string, token: string): () => Promise<ApiResult<PartialUser>>;
}

export const getVisitedUser: IGetVistiedUser = (userName, token) => {
    return async () => {
        const response = await server_axios.get(
            `Users/GetVisitedUser/${userName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    };
};

export const useVisitedUser = (userName: string, token: string) => {
    return useQuery("visitedUser", getVisitedUser(userName, token));
};
