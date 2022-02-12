import {FC, useState} from "react";
import {useUserContext} from "../../../../../../../../contexts/user-context/user-context";
import Avatar from "../../../../../../../core-ui/avatar/avatar";

import defaultProfile from "../../../../../../../../assets/images/default-profile.png";
import useHandleableState from "../../../../../../../../hooks/useHandleableState";
import {
    ISendTweetData,
    TweetTypes,
} from "../../../../../../../../types/data/tweet";
import {useSendTweet} from "../../../../../../../../api/mutations/useSendTweet";
import SendTweetActionButtons from "../../send-tweet-action-buttons/send-tweet-action-buttons";
import {
    SendICon,
    SendIconLoading,
} from "../../../../../../../core-ui/common/common-icons";
import SendTweet from "../../send-tweet-input/send-tweet-input";
import {useTweetsSideContext} from "../../../../../../../../contexts/tweets-side-context/tweets-side-context";

interface SendReplyDialogInputProps {}

const SendReplyDialogInput: FC<SendReplyDialogInputProps> = () => {
    const {baseTweet} = useTweetsSideContext();
    return (
        <SendTweet
            sendType={TweetTypes.Replay}
            baseTweetId={baseTweet?.tweetId}
        />
    );
};

export default SendReplyDialogInput;
