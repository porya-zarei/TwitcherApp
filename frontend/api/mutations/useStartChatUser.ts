import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {ChatTypes, IStartChatUser} from "../../types/data/chat";

export const startChatUser = async (data: IStartChatUser) => {
    data.chatType = ChatTypes.Pv;
    data.description = "";
    // data with out token
    const sendData: Omit<IStartChatUser, "token"> = {
        ...data,
    };
    const response = await server_axios.post<ApiResult<boolean>>(
        "/Chats/CreateChat",
        sendData,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            },
        },
    );
    return response.data;
};

export const useStartChatUser = () => {
    return useMutation(startChatUser);
};
