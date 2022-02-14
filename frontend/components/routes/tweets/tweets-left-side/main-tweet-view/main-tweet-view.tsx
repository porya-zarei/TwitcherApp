import {FC} from "react";
import {useTweetsPageContext} from "../../../../../contexts/tweets-page-context/tweets-page-context";
import {PartialFullTweet} from "../../../../../types/data/tweet";
import TweetView from "../../../../core-ui/tweet-view/tweet-view";

interface MainTweetViewProps {}

const MainTweetView: FC<MainTweetViewProps> = () => {
    const {fullTweet} = useTweetsPageContext();
    return (
        <div className="w-full flex justify-center items-center">
            {fullTweet && <TweetView tweet={fullTweet} />}
        </div>
    );
};

export default MainTweetView;
