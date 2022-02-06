import {AxiosResponse} from "axios";
import {useQuery, UseQueryResult} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {Tweet} from "../../types/data/tweet";

export const getFeedTweets = (
    userName: string,
    token: string,
): (() => Promise<ApiResult<Tweet[]>>) => {
    return async () => {
        let data: ApiResult<Tweet[]>;
        try {
            const response: AxiosResponse<ApiResult<Tweet[]>> =
                await server_axios.get(`Tweets/GetFeed/${userName}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            data = response.data;
            console.log("data in get feed => ", data);
            return data;
        } catch (error: any) {
            console.log(error);
            data = {
                message: error?.message,
                ok: false,
                result: [],
                status: error?.response?.status,
                errors: [],
            };
            return data;
        }
    };
};

export const useFeedTweets = (
    userName: string,
): UseQueryResult<AxiosResponse<ApiResult<Tweet[]>>> => {
    return useQuery(["feedTweets", userName], getFeedTweets(userName));
};
