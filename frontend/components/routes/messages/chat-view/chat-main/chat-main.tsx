import {FC} from "react";
import MessagesList from "../../../../core-ui/chat/messages/messages-list";

interface ChatMainProps {}

const ChatMain: FC<ChatMainProps> = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <MessagesList />
        </div>
    );
};

export default ChatMain;
