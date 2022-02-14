import {Context, useContext, useState} from "react";
import {createContext, FC, useMemo} from "react";
import {PartialFullTweet} from "../../types/data/tweet";

interface ITweetsPageContext {
    fullTweet?: PartialFullTweet;
}

interface TweetsPageContextProviderProps {
    initial: ITweetsPageContext;
}

const TweetsPageContext: Context<ITweetsPageContext> = createContext({});

const TweetsPageContextProvider: FC<TweetsPageContextProviderProps> = ({
    children,
    initial,
}) => {
    // const [fullTweet, setFullTweet] = useState<PartialFullTweet>({
    //     ...initial?.fullTweet,
    // });
    // const context: ITweetsPageContext = useMemo<ITweetsPageContext>(
    //     () => ({
    //         fullTweet,
    //     }),
    //     [fullTweet,initial,initial?.fullTweet],
    // );
    const context: ITweetsPageContext = {
        fullTweet: initial.fullTweet,
    };
    return (
        <TweetsPageContext.Provider value={context}>
            {children}
        </TweetsPageContext.Provider>
    );
};

export default TweetsPageContextProvider;

export const useTweetsPageContext = () => {
    const context = useContext<ITweetsPageContext>(TweetsPageContext);
    if (!context) {
        throw new Error(
            "useTweetsPageContext must be used within a TweetsPageContextProvider",
        );
    }
    return context;
};
