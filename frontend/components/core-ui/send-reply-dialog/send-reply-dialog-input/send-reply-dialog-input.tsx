import {FC} from "react";
import {TweetTypes} from "../../../../types/data/tweet";
import {useTweetsSideContext} from "../../../../contexts/tweets-side-context/tweets-side-context";
import SendTweetInput from "../../send-tweet-input/send-tweet-input";

interface SendReplyDialogInputProps {}

const SendReplyDialogInput: FC<SendReplyDialogInputProps> = () => {
    const {baseTweet} = useTweetsSideContext();
    return (
        <SendTweetInput
            sendType={TweetTypes.Replay}
            baseTweetId={baseTweet?.tweetId}
        />
    );
};

export default SendReplyDialogInput;
