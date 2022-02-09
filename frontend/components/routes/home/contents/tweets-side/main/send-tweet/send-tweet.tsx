import Image from "next/image";
import {FC, useState} from "react";
import {
    HiOutlinePhotograph,
    HiOutlineCalendar,
    HiOutlineFilm,
    HiOutlineEmojiHappy,
    HiOutlineLocationMarker,
    HiOutlineChartBar,
    HiPaperAirplane,
    HiOutlineRefresh,
} from "react-icons/hi";
import {useSendTweet} from "../../../../../../../api/mutations/useSendTweet";

import defaultProfile from "../../../../../../../assets/images/default-profile.png";
import {useUserContext} from "../../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../../hooks/useHandleableState";
import {
    ISendTweetData,
    TweetTypes,
} from "../../../../../../../types/data/tweet";
import SendTweetActionButtons from "./send-tweet-action-buttons/send-tweet-action-buttons";

const actions = [
    {
        icon: <HiOutlinePhotograph size={23} />,
        onClick: () => {
            const inputElement = document.createElement("input");
        },
        name: "add photo",
    },
    {
        icon: <HiOutlineCalendar size={23} />,
        onClick: () => {},
        name: "add event",
    },
    {
        icon: <HiOutlineFilm size={23} />,
        onClick: () => {},
        name: "add video",
    },
    {
        icon: <HiOutlineEmojiHappy size={23} />,
        onClick: () => {},
        name: "add emoji",
    },
    {
        icon: <HiOutlineLocationMarker size={23} />,
        onClick: () => {},
        name: "add location",
    },
    {
        icon: <HiOutlineChartBar size={23} />,
        onClick: () => {},
        name: "add poll",
    },
];

interface SendTweetProps {}

const SendTweet: FC<SendTweetProps> = () => {
    const {mutateAsync, isLoading} = useSendTweet();
    const {user, token} = useUserContext();
    const [images, setImages] = useState<File[]>([] as File[]);
    const {value: tweetText, onChange: onTweetTextChange} =
        useHandleableState("");
    const sendTweet = async () => {
        const tweet: Record<string, any> = {
            content: tweetText,
            title: tweetText,
            images,
            reTweetType: TweetTypes.Tweet,
            senderUserName: user?.userName ?? "",
        };
        const formData: FormData = new FormData();
        for (const key in tweet) {
            if (tweet.hasOwnProperty(key)) {
                formData.append(key, tweet[key]);
            }
        }
        console.log(document.cookie);
        console.log("tweet => ",tweet,formData.get("images"));
        const data: ISendTweetData = {
            tweet: formData,
            token,
        };
        const response = await mutateAsync(data);
        if (response?.ok && response?.result) {
            console.log("result in create tweet => ", response?.result);
        }
    };
    return (
        <div className="p-2 h-36 flex justify-evenly items-center flex-nowrap flex-row mb-2 border-b-[1.5px] border-gray-400">
            <div className="flex-1 h-full flex justify-center items-start py-2">
                <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                    <Image
                        src={user?.profileImage ?? defaultProfile}
                        title={user?.fullName}
                        layout="intrinsic"
                        alt="user profile"
                        width={50}
                        height={50}
                    />
                </div>
            </div>
            <div className="w-full h-full flex justify-center items-start content-between flex-wrap flex-row">
                <div className="w-full h-auto p-2 border-b-[1px] border-gray-500">
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
                    <SendTweetActionButtons setImages={setImages} />
                    <div className="flex-1">
                        <button
                            type="button"
                            onClick={sendTweet}
                            className="border-none group bg-blue-700 p-2 text-lg rounded-full flex justify-center items-center overflow-hidden w-20 h-10">
                            {isLoading ? (
                                <span className="transition-all">
                                    <HiOutlineRefresh
                                        size={20}
                                        className="animate-spin"
                                    />
                                </span>
                            ) : (
                                <>
                                    <span className="transition-all group-hover:hidden font-bold">
                                        Tweet
                                    </span>
                                    <span className="hidden transition-all translate-x-[200%] group-hover:block group-hover:translate-x-0 animate-pulse">
                                        <HiPaperAirplane
                                            size={20}
                                            className="transition-all rotate-90"
                                        />
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendTweet;
