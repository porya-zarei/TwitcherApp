import {AxiosResponse} from "axios";
import {useQuery, UseQueryResult} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {PartialFullTweet, Tweet} from "../../types/data/tweet";

export const getFullTweet = (
    tweetId?: string,
    token?: string,
): (() => Promise<ApiResult<PartialFullTweet>>) => {
    return async () => {
        let data: ApiResult<PartialFullTweet>;
        try {
            const response: AxiosResponse<ApiResult<PartialFullTweet>> =
                await server_axios.get(`Tweets/GetFullTweet/${tweetId}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            data = response.data;
            return data;
        } catch (error: any) {
            console.log(error);
            data = {
                message: error?.message,
                ok: false,
                result: {},
                status: error?.response?.status,
                errors: [],
            };
            return data;
        }
    };
};

export const useFullTweet = (
    tweetId?: string,
    token?: string,
): UseQueryResult<ApiResult<PartialFullTweet>> => {
    return useQuery(["fullTweet", tweetId], getFullTweet(tweetId, token));
};
