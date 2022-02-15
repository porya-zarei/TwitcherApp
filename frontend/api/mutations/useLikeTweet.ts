import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import {server_axios} from "../../axios/axios-instances";
import {ApiResult} from "../../types/data/api-result";
import {ILoginData} from "../../types/data/auth";
import { ILikeTweetData, TweetLiked } from "../../types/data/tweet";
import {PartialUserWithToken} from "../../types/data/user";


type HandleLikeTweetType = (
    data:ILikeTweetData ,
) => Promise<ApiResult<TweetLiked>>;

export const handleLikeTweet: HandleLikeTweetType = async (data: ILikeTweetData) => {
    const response: AxiosResponse<
        ApiResult<TweetLiked>,
        any
    > = await server_axios.post("Tweets/LikeTweet", data,{
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });
    return response.data;
};

export const useLikeTweet = () => {
    return useMutation(handleLikeTweet);
};
