import {FC} from "react";
import {useMessagesContext} from "../../../../contexts/messages-context/messages-context";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import {getRandomNumber} from "../../../../utils/helpers";
import MessageView from "./message-view";

interface MessagesListProps {}

const MessagesList: FC<MessagesListProps> = () => {
    const {selectedChat} = useMessagesContext();
    const {user} = useUserContext();
    return (
        <div className="w-full h-full flex justify-center overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth">
            <ul className="w-full flex justify-center content-start flex-wrap">
                {selectedChat?.messages &&
                    selectedChat?.messages?.map((message) => (
                        <li
                            key={message?.messageId}
                            className="w-full h-auto flex justify-center items-center">
                            <MessageView
                                message={message}
                                me={user?.userId === message?.sender?.userId}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MessagesList;
