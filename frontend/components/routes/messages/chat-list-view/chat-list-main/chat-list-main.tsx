import { FC } from "react";
import ChatList from "./chat-list/chat-list";

interface ChatListMainProps {
    
}
 
const ChatListMain: FC<ChatListMainProps> = () => {
    return (
        <main className="w-full h-[80vh] flex justify-start items-center content-start flex-wrap">
            <ChatList />
        </main>
    );
}
 
export default ChatListMain;