import {FetchQueryOptions, QueryClient} from "react-query";
import {ApiResult} from "../../types/data/api-result";
import {Tweet} from "../../types/data/tweet";
import {User} from "../../types/data/user";
import {getFeedTweets} from "../queries/useFeedTweets";

const rqStaleTime: number = 1000 * 60 * 5;

let queryClient: QueryClient;

interface initialData {
    feedTweetsData: {
        tweets: Tweet[];
        userName: string;
        token: string;
    };
    users?: User[];
}

export const prefetchOptions: FetchQueryOptions<ApiResult<Tweet[]>> = {
    staleTime: rqStaleTime,
};

export const getQueryClient = (initial?: initialData) => {
    queryClient = queryClient || new QueryClient();
    if (initial?.feedTweetsData?.tweets) {
        queryClient.setQueryData(
            ["feedTweets", initial.feedTweetsData.userName],
            initial.feedTweetsData.tweets,
        );
    } else if (initial?.feedTweetsData?.userName) {
        queryClient.prefetchQuery(
            ["feedTweets", initial.feedTweetsData.userName],
            getFeedTweets(
                initial.feedTweetsData.userName,
                initial?.feedTweetsData?.token,
            ),
            prefetchOptions,
        );
    }
    return queryClient;
};
