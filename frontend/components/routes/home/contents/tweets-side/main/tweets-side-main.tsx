import {FC} from "react";
import SendReplyDialog from "./send-reply-dialog/send-reply-dialog";
import SendTweet from "./send-tweet-input/send-tweet-input";
import TweetsView from "./tweets/tweets-view";

interface TweetsSideMainProps {}

const TweetsSideMain: FC<TweetsSideMainProps> = () => {
    return (
        <div className="w-full flex justify-center items-center flex-wrap flex-row">
            <div className="w-full flex justify-center items-center">
                <SendTweet />
            </div>
            <div className="w-full flex justify-center items-center">
                <TweetsView />
            </div>
            <div>
                <SendReplyDialog/>
            </div>
        </div>
    );
};

export default TweetsSideMain;
