import {useRouter} from "next/router";
import {Context, Dispatch, useContext, useEffect, useReducer} from "react";
import {createContext, FC, useMemo} from "react";
import { ApiResult } from "../../types/data/api-result";
import {PartialTweet, Tweet} from "../../types/data/tweet";
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
        | "ADD_FEED_TWEET"
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
        case "SET_FEED_TWEETS":
            return {...state, feedTweets: action.payload as Tweet[]};
        case "ADD_FEED_TWEET":
            const feeds = [...state.feedTweets];
            feeds.unshift(action.payload as Tweet);
            return {...state, feedTweets: [...feeds]};
        default:
            return state;
    }
};

const HomeContextProvider: FC<HomeContextProviderProps> = ({
    children,
    initial,
}) => {
    const router = useRouter();
    const {connection} = useUserContext();
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
            connection?.on?.("NewTweetArrived", (tweet: ApiResult<PartialTweet>) => {
                dispatch({
                    type: "ADD_FEED_TWEET",
                    payload: tweet.result,
                });
            });
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
