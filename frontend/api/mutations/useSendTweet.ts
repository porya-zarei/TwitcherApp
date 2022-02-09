import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {ISendTweetData, PartialTweet} from "../../types/data/tweet";

type handleSendTweetType = (
    data: ISendTweetData,
) => Promise<ApiResult<PartialTweet> | null>;
export const handleSendTweet: handleSendTweetType = async (
    data: ISendTweetData,
) => {
    try {
        const response: AxiosResponse<
            ApiResult<PartialTweet>,
            any
        > = await server_axios.post("Tweets/Create", data?.tweet, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const useSendTweet = () => {
    return useMutation(handleSendTweet);
};
