import {FC} from "react";
import SendReplyDialog from "../../../../../core-ui/send-reply-dialog/send-reply-dialog";
import SendTweetInput from "../../../../../core-ui/send-tweet-input/send-tweet-input";
import TweetsView from "./tweets/tweets-view";

interface TweetsSideMainProps {}

const TweetsSideMain: FC<TweetsSideMainProps> = () => {
    return (
        <div className="w-full flex justify-center items-center flex-wrap flex-row">
            <div className="w-full flex justify-center items-center">
                <SendTweetInput />
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
