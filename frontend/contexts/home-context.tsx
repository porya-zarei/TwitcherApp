import {Context, Dispatch, useContext, useReducer} from "react";
import {createContext, FC, useMemo} from "react";
import {useFeedTweets} from "../api/queries/useFeedTweets";
import {Tweet} from "../types/data/tweet";

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

enum HomeContextActionTypes {
    SET_FEED_TWEETS = "SET_FEED_TWEETS",
    UPDATE_FEED_TWEETS = "UPDATE_FEED_TWEETS",
}

interface IHomeContextAction {
    type: keyof typeof HomeContextActionTypes;
    payload: any;
}

const homeContextReducers = (
    state: IHomeContextState,
    action: IHomeContextAction,
) => {
    switch (action.type) {
        case HomeContextActionTypes.SET_FEED_TWEETS:
            return {...state, feedTweets: action.payload as Tweet[]};
        default:
            return state;
    }
};

const HomeContextProvider: FC<HomeContextProviderProps> = ({
    children,
    initial,
}) => {
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
