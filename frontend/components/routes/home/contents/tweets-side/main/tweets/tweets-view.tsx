import {FC} from "react";
import { useHomeContext } from "../../../../../../../contexts/home-context/home-context";
import TweetView from "../../../../../../core-ui/tweet-view/tweet-view";

interface TweetsViewProps {}

const TweetsView: FC<TweetsViewProps> = () => {
    const {feedTweets} = useHomeContext();
    return (
        <div className="w-full flex justify-center items-center content-start flex-wrap flex-row mb-20">
            {feedTweets?.map((tweet) => (
                <TweetView key={tweet.tweetId} tweet={tweet} />
            ))}
        </div>
    );
};

export default TweetsView;
