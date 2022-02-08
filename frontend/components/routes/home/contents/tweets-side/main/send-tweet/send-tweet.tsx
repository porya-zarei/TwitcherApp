import Image from "next/image";
import {FC} from "react";
import {
    HiOutlinePhotograph,
    HiOutlineCalendar,
    HiOutlineFilm,
    HiOutlineEmojiHappy,
    HiOutlineLocationMarker,
    HiOutlineChartBar,
    HiPaperAirplane,
} from "react-icons/hi";

import defaultProfile from "../../../../../../../assets/images/default-profile.png";

const actions = [
    {
        icon: <HiOutlinePhotograph size={23} />,
        onClick: () => {},
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
    return (
        <div className="p-2 h-36 flex justify-evenly items-center flex-nowrap flex-row mb-2 border-b-[1.5px] border-gray-400">
            <div className="flex-1 h-full flex justify-center items-start py-2">
                <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                    <Image
                        src={defaultProfile}
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
                    />
                </div>
                <div className="w-full mt-auto h-auto flex justify-between items-center flex-nowrap flex-row px-2">
                    <div className="w-full">
                        {actions.map((action) => (
                            <button
                                onClick={action.onClick}
                                type="button"
                                className="border-none bg-transparent text-blue-600 mx-1"
                                key={action.name}
                                title={action.name}>
                                {action.icon}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1">
                        <button type="button" className="border-none group bg-blue-700 p-2 text-lg rounded-full flex justify-center items-center overflow-hidden w-20 h-10">
                            <span className="transition-all group-hover:hidden font-bold">
                                Tweet
                            </span>
                            <span className="hidden transition-all translate-x-[200%] group-hover:block group-hover:translate-x-0 animate-pulse">
                                <HiPaperAirplane
                                    size={20}
                                    className="transition-all rotate-90"
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendTweet;
