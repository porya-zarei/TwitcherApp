import {useRouter} from "next/router";
import {Context, Dispatch, useContext, useEffect, useReducer} from "react";
import {createContext, FC, useMemo} from "react";
import {ApiResult} from "../../types/data/api-result";
import {PartialTweet, Tweet, TweetLiked} from "../../types/data/tweet";
import {useUserContext} from "../user-context/user-context";

interface HomeContextProps {
    feedTweets?: Tweet[];
    dispatch?: Dispatch<IHomeContextAction>;
}

interface HomeContextProviderProps {
    initial: {
        feedTweets?: Tweet[];
    };
}

const HomeContext: Context<HomeContextProps> = createContext({});

interface IHomeContextState {
    feedTweets: Tweet[];
}

interface IActionTypes {
    type:
        | "SET_FEED_TWEETS"
        | "UPDATE_FEED_TWEETS"
        | "UPDATE_FEED_TWEET"
        | "ADD_FEED_TWEET"
        | "UPDATE_TWEET_LIKE"
        | "REMOVE_FEED_TWEET";
}

interface IHomeContextAction {
    type: IActionTypes["type"];
    payload: any;
}

const homeContextReducers = (
    state: IHomeContextState,
    action: IHomeContextAction,
) => {
    switch (action.type) {
        case "SET_FEED_TWEETS": {
            return {...state, feedTweets: action.payload as Tweet[]};
        }
        case "ADD_FEED_TWEET": {
            const feeds = [...state.feedTweets];
            feeds.unshift(action.payload as Tweet);
            return {...state, feedTweets: [...feeds]};
        }
        case "UPDATE_TWEET_LIKE": {
            const feeds = [...state.feedTweets];
            const payload = action.payload as TweetLiked;
            const index = feeds.findIndex(
                (feed) => feed.tweetId === payload.tweetId,
            );
            feeds[index] = {...feeds[index], likesCount: payload?.likesCount};
            return {...state, feedTweets: [...feeds]};
        }
        case "UPDATE_FEED_TWEET": {
            const feeds = [...state.feedTweets];
            const payload = action.payload as PartialTweet;
            const index = feeds.findIndex(
                (feed) => feed.tweetId === payload.tweetId,
            );
            feeds[index] = {...feeds[index], ...payload};
            return {...state, feedTweets: [...feeds]};
        }
        default:
            return state;
    }
};

const HomeContextProvider: FC<HomeContextProviderProps> = ({
    children,
    initial,
}) => {
    const router = useRouter();
    const {connection, user} = useUserContext();
    const initialForReducer: IHomeContextState = {
        feedTweets: initial.feedTweets ?? [],
    };
    const [state, dispatch] = useReducer(
        homeContextReducers,
        initialForReducer,
    );
    const context: HomeContextProps = useMemo<HomeContextProps>(
        () => ({
            feedTweets: state.feedTweets,
            dispatch,
        }),
        [state, dispatch],
    );
    useEffect(() => {
        if (state.feedTweets.length === 0) {
            router.push("/auth/login");
        }
    }, []);

    useEffect(() => {
        if (connection) {
            connection?.on?.(
                "NewTweetArrived",
                (tweet: ApiResult<PartialTweet>) => {
                    dispatch({
                        type: "ADD_FEED_TWEET",
                        payload: tweet.result,
                    });
                },
            );
            connection?.on?.(
                "TweetUpdated",
                (tweet: ApiResult<PartialTweet>) => {
                    dispatch({
                        type: "UPDATE_FEED_TWEETS",
                        payload: tweet.result,
                    });
                },
            );
            connection?.on?.(
                "TweetLiked",
                (tweetLiked: ApiResult<TweetLiked>) => {
                    console.log("event tweet liked => ", tweetLiked);
                    dispatch({
                        type: "UPDATE_TWEET_LIKE",
                        payload: tweetLiked.result,
                    });
                },
            );
            connection?.send?.(
                "ChackConnection",
                user?.userName || "",
                connection.connectionId,
            );
            console.log("connection => ", connection);
        }
    }, [connection]);

    return (
        <HomeContext.Provider value={context}>{children}</HomeContext.Provider>
    );
};

export default HomeContextProvider;

export const useHomeContext = (): HomeContextProps => {
    const context: HomeContextProps = useContext(HomeContext);
    if (context === undefined) {
        throw new Error(
            "useHomeContext must be used within a HomeContextProvider",
        );
    }
    return context;
};
