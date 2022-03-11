import {FC, useMemo} from "react";
import {HiInformationCircle} from "react-icons/hi";
import {useMessagesContext} from "../../../../../contexts/messages-context/messages-context";
import {useUserContext} from "../../../../../contexts/user-context/user-context";
import {PartialUser} from "../../../../../types/data/user";
import {getOtherUser, getUserProfileImage} from "../../../../../utils/helpers";
import Avatar from "../../../../core-ui/avatar/avatar";

interface ChatHeaderProps {}

const ChatHeader: FC<ChatHeaderProps> = () => {
    const {selectedChat} = useMessagesContext();
    const {user} = useUserContext();
    const otherUser: PartialUser = useMemo(
        () => ({
            ...getOtherUser(selectedChat?.users, user?.userName),
        }),
        [selectedChat, user],
    );
    console.log("otherUser header =>", otherUser);
    return (
        <div className="w-full h-full flex justify-center items-center px-2">
            <div className="w-full h-full flex justify-start content-start flex-wrap border-b border-secondary">
                <div className="w-full h-12 relative flex justify-start items-center">
                    <div className="w-auto h-full flex justify-center items-center p-2">
                        <Avatar
                            src={getUserProfileImage(otherUser)}
                            layout="intrinsic"
                            alt="user profile"
                            className="z-0"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="h-full flex justify-center content-evenly flex-wrap">
                        <span className="w-full text-sm">{`${
                            otherUser?.firstName || ""
                        } ${otherUser?.lastName || ""}`}</span>
                        <span className="w-full text-sm">
                            @{otherUser?.userName || ""}
                        </span>
                    </div>
                    <div className="p-1 h-full absolute right-2 flex justify-center items-center">
                        <HiInformationCircle />
                    </div>
                </div>
                <div className="w-full h-[calc(100%-48px)] flex justify-center items-center">
                    <div className="flex justify-center content-center items-center flex-wrap">
                        <div className="w-full flex justify-center items-center">
                            <span className="w-full text-sm mr-2">
                                {otherUser?.followersCount || "0"} Follower{" "}
                                {selectedChat?.chatId}
                            </span>
                            <span className="w-full text-sm">
                                {otherUser?.followingsCount || "0"} Following
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <span className="w-full text-sm mr-2">{`${
                                otherUser?.firstName || ""
                            } ${otherUser?.lastName || ""}`}</span>
                            <span className="w-full text-sm">
                                @{otherUser?.userName || ""}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
