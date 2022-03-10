import {useQuery} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {PartialChat} from "../../types/data/chat";

export const getChats = (userName: string, token: string) => {
    return async () => {
        const response = await server_axios.get<ApiResult<PartialChat[]>>(
            `Chats/GetChats/${userName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    };
};

export const useChats = (userName: string, token: string) => {
    return useQuery(["chats", userName], getChats(userName, token));
};
