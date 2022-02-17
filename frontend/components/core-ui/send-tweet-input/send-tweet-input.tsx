import {FC, useState} from "react";
import {useSendTweet} from "../../../api/mutations/useSendTweet";

import defaultProfile from "../../../assets/images/default-profile.png";
import {useTweetsSideContext} from "../../../contexts/tweets-side-context/tweets-side-context";
import {useUserContext} from "../../../contexts/user-context/user-context";
import useHandleableState from "../../../hooks/useHandleableState";
import {ISendTweetData, TweetTypes} from "../../../types/data/tweet";
import {getUserProfileImage, objectToFormData} from "../../../utils/helpers";
import Avatar from "../../core-ui/avatar/avatar";
import {SendICon, SendIconLoading} from "../../core-ui/common/common-icons";
import SendTweetActionButtons from "../send-tweet-action-buttons/send-tweet-action-buttons";

interface SendTweetInputProps {
    sendType?: TweetTypes;
    baseTweetId?: string;
}

const SendTweetInput: FC<SendTweetInputProps> = ({
    sendType = TweetTypes.Tweet,
    baseTweetId,
}) => {
    const {setShowReplyDialog} = useTweetsSideContext();
    const {mutateAsync, isLoading} = useSendTweet();
    const {user, token} = useUserContext();
    const [images, setImages] = useState<File[]>([] as File[]);
    const [video, setVideo] = useState<File>({} as File);
    const {
        value: tweetText,
        onChange: onTweetTextChange,
        reset,
        update,
    } = useHandleableState("");

    const resetStates = () => {
        setImages([] as File[]);
        setVideo({} as File);
        reset("");
    };

    const sendTweet = async () => {
        const tweet: Record<string, any> = {
            content: tweetText,
            title: tweetText,
            reTweetType: sendType,
            senderUserName: user?.userName ?? "",
            baseTweetId: baseTweetId || "",
            images,
            video,
        };
        const formData: FormData = objectToFormData(tweet);
        console.log(document.cookie);
        console.log("tweet => ", tweet, formData.get("images"));
        const data: ISendTweetData = {
            tweet: formData,
            token,
        };
        const response = await mutateAsync(data);
        if (response?.ok && response?.result) {
            console.log("result in create tweet => ", response?.result);
            setShowReplyDialog?.(false);
            resetStates();
        }
    };
    const isBtnDisabled = isLoading || tweetText.length === 0;
    let imageUrl = getUserProfileImage(user);
    return (
        <div className="w-full p-2 h-36 flex justify-evenly items-center flex-nowrap flex-row mb-2 border-b-[1.5px] border-secondary">
            <div className="flex-1 h-full flex justify-center items-start py-2">
                <Avatar
                    src={imageUrl}
                    layout="intrinsic"
                    alt={user?.userName ?? "default profile"}
                />
            </div>
            <div className="w-full h-full flex justify-center items-start content-between flex-wrap flex-row">
                <div className="w-full h-auto p-2">
                    <input
                        autoFocus={true}
                        className="w-full h-10 outline-none border-none bg-transparent text-2xl"
                        placeholder="What's happening?"
                        type="text"
                        value={tweetText}
                        onChange={onTweetTextChange}
                    />
                </div>
                <div className="w-full mt-auto h-auto flex justify-between items-center flex-nowrap flex-row px-2">
                    <SendTweetActionButtons
                        setVideo={setVideo}
                        setImages={setImages}
                        updateTweetText={update}
                    />
                    <div className="flex-1">
                        <button
                            type="button"
                            onClick={sendTweet}
                            disabled={isBtnDisabled}
                            className={`border-none group ${
                                isBtnDisabled
                                    ? " bg-secondary bg-opacity-25"
                                    : "bg-primary"
                            } text-slate-100 p-2 text-lg rounded-full flex justify-center items-center overflow-hidden w-20 h-10`}>
                            {isLoading ? (
                                <SendIconLoading />
                            ) : (
                                <>
                                    <span className="transition-all group-hover:hidden font-bold">
                                        Tweet
                                    </span>
                                    <SendICon />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendTweetInput;
