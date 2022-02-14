import {FC} from "react";
import {useTweetsPageContext} from "../../../../../contexts/tweets-page-context/tweets-page-context";
import TweetView from "../../../../core-ui/tweet-view/tweet-view";

interface MainTweetRepliesViewProps {}

const MainTweetRepliesView: FC<MainTweetRepliesViewProps> = () => {
    const {fullTweet} = useTweetsPageContext();
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center content-start flex-wrap flex-row mb-20">
                {fullTweet &&
                    fullTweet?.replies &&
                    fullTweet?.replies?.length > 0 &&
                    fullTweet?.replies?.map((tweet) => (
                        <TweetView
                            key={tweet.tweetId}
                            tweet={tweet}
                            showBaseTweet={false}
                        />
                    ))}
            </div>
        </div>
    );
};

export default MainTweetRepliesView;
