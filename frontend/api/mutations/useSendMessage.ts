import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";

interface SendMessageData {
    token: string;
    formData: FormData;
}

export const sendMessage = async (messageData: SendMessageData) => {
    const response = await server_axios.post<ApiResult<boolean>>(
        "chats/CreateMessage",
        messageData.formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${messageData.token}`,
            },
        },
    );
    return response.data;
};

export const useSendMessage = () => {
    return useMutation(sendMessage);
};
