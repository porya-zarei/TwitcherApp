import {FC} from "react";
import SendTweet from "./send-tweet/send-tweet";
import TweetsView from "./tweets/tweets-view";

interface TweetsSideMainProps {}

const TweetsSideMain: FC<TweetsSideMainProps> = () => {
    return (
        <div>
            <div>
                <SendTweet />
            </div>
            <div>
                <TweetsView />
            </div>
        </div>
    );
};

export default TweetsSideMain;
