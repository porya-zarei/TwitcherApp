import Image from "next/image";
import Link from "next/link";
import {FC, MouseEvent, MouseEventHandler, useState} from "react";
import {useMessagesContext} from "../../../../../../contexts/messages-context/messages-context";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import {PartialChat} from "../../../../../../types/data/chat";
import {PartialUser} from "../../../../../../types/data/user";
import {
    getOtherUser,
    getUserProfileImage,
} from "../../../../../../utils/helpers";
import Avatar from "../../../../../core-ui/avatar/avatar";

interface ChatListItemProps {
    chat: PartialChat;
}

const ChatListItem: FC<ChatListItemProps> = ({chat}) => {
    const {user} = useUserContext();
    const {changeSelectedChat} = useMessagesContext();
    const otherUser: PartialUser = {
        ...getOtherUser(chat.users, user?.userName),
    };
    const handleSelectChat = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("selected chat => ", chat);
        console.log("other user in item => ", otherUser);
        changeSelectedChat?.(chat);
    };
    return (
        <Link href={chat?.chatId || ""}>
            <a
                onClick={handleSelectChat}
                className="w-full z-0 relative flex justify-start h-16 items-center content-between flex-nowrap flex-row hover:bg-slate-500 hover:bg-opacity-25">
                <div className="w-auto h-full flex justify-center items-center p-2">
                    <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                        <Avatar
                            src={getUserProfileImage(otherUser)}
                            layout="intrinsic"
                            alt="user profile"
                            className="z-0"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
                <div className="w-full h-full flex justify-center items-center content-center flex-wrap flex-row">
                    <span className="w-full font-bold text-opacity-75 text-slate-900 dark:text-slate-100">
                        <span>{otherUser?.firstName || ""}</span>
                        <span className="text-secondary">
                            @{otherUser?.userName || ""}
                        </span>
                    </span>
                    <span className="w-full text-xs text-opacity-60 text-slate-900 dark:text-slate-200">
                        {chat?.messages?.[0]?.content || ""}
                    </span>
                </div>
                <div className="absolute top-0 right-0 p-1 flex justify-center content-evenly flex-wrap">
                    <span className="w-full text-xs text-opacity-60 text-slate-900 dark:text-slate-200">
                        {chat?.messages?.[0]?.sendedAt || "Time"}
                    </span>
                    <span className="w-full text-xs text-opacity-60 text-slate-900 dark:text-slate-200">
                        {chat?.messages?.length || "0"}
                    </span>
                </div>
            </a>
        </Link>
    );
};

export default ChatListItem;
