import {Context, useContext, useState} from "react";
import {createContext, FC, useMemo} from "react";
import {PartialTweet} from "../../types/data/tweet";

interface ITweetsSideContext {
    baseTweet?: PartialTweet;
    setBaseTweet?: (value: PartialTweet) => void;
    showReplyDialog?: boolean;
    setShowReplyDialog?: (value: boolean) => void;
}

interface TweetsSideContextProviderProps {}

const TweetsSideContext: Context<ITweetsSideContext> = createContext({});

const TweetsSideContextProvider: FC<TweetsSideContextProviderProps> = ({
    children,
}) => {
    const [baseTweet, setBaseTweet] = useState<PartialTweet>({});
    const [showReplyDialog, setShowReplyDialog] = useState<boolean>(false);
    const context: ITweetsSideContext = useMemo<ITweetsSideContext>(
        () => ({
            baseTweet,
            setBaseTweet,
            showReplyDialog,
            setShowReplyDialog,
        }),
        [baseTweet, showReplyDialog],
    );
    return (
        <TweetsSideContext.Provider value={context}>
            {children}
        </TweetsSideContext.Provider>
    );
};

export default TweetsSideContextProvider;

export const useTweetsSideContext = (): ITweetsSideContext => {
    const context = useContext(TweetsSideContext);
    if (!context) {
        throw new Error(
            "useTweetsSideContext must be used within a TweetsSideContextProvider",
        );
    }
    return context;
};
