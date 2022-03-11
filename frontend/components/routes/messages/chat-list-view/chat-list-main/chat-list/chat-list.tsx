import {FC} from "react";
import {useMessagesContext} from "../../../../../../contexts/messages-context/messages-context";
import ChatListItem from "./chat-list-item";

interface ChatListProps {}

const ChatList: FC<ChatListProps> = () => {
    const {filteredChats} = useMessagesContext();
    return (
        <div className="w-full flex justify-start items-start">
            <div className="w-full flex justify-center content-start flex-wrap h-auto max-h-[80vh]">
                {filteredChats?.map((chat) => (
                    <ChatListItem key={chat?.chatId} chat={{...chat}} />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
