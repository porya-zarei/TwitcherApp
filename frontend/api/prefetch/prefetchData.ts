import {FetchQueryOptions, QueryClient} from "react-query";
import {ApiResult} from "../../types/data/api-result";
import {PartialFullTweet, Tweet} from "../../types/data/tweet";
import {User} from "../../types/data/user";
import {getFeedTweets} from "../queries/useFeedTweets";
import {getFullTweet} from "../queries/useFullTweet";

const rqStaleTime: number = 1000 * 60 * 5;

interface initialData {
    feedTweetsData: {
        tweets: Tweet[];
        userName: string;
        token: string;
    };
    users?: User[];
    fullTweetData?:
        | {
              fullTweet?: PartialFullTweet;
              token?: string;
              tweetId?: string;
          }
        | {
              fullTweet?: PartialFullTweet;
              token: string;
              tweetId: string;
          };
}

export const prefetchOptions: FetchQueryOptions<ApiResult<any>> = {
    staleTime: rqStaleTime,
};

export const getQueryClient = async (initial?: initialData) => {
    const queryClient =  new QueryClient();
    if (initial?.feedTweetsData?.tweets) {
        queryClient.setQueryData(
            ["feedTweets", initial.feedTweetsData.userName],
            initial.feedTweetsData.tweets,
        );
    } else if (initial?.feedTweetsData?.userName) {
        await queryClient.prefetchQuery(
            ["feedTweets", initial.feedTweetsData.userName],
            getFeedTweets(
                initial.feedTweetsData.userName,
                initial?.feedTweetsData?.token,
            ),
            prefetchOptions,
        );
    }
    if (initial?.fullTweetData && initial.fullTweetData?.fullTweet) {
        // console.log("initial.fullTweetData.fullTweet => ", initial.fullTweetData);
        queryClient.setQueryData(
            ["fullTweet", initial.fullTweetData.fullTweet.tweetId],
            initial.fullTweetData.fullTweet,
        );
    } else if (
        initial?.fullTweetData?.tweetId &&
        initial.fullTweetData?.token
    ) {
        await queryClient.prefetchQuery(
            ["fullTweet", initial.fullTweetData?.tweetId],
            getFullTweet(
                initial.fullTweetData?.tweetId,
                initial?.fullTweetData?.token,
            ),
            prefetchOptions,
        );
    }
    return queryClient;
};
