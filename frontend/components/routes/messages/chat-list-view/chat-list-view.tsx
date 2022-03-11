import {FC} from "react";
import ChatListHeader from "./chat-list-header/chat-list-header";
import ChatListMain from "./chat-list-main/chat-list-main";

interface ChatListViewProps {}

const ChatListView: FC<ChatListViewProps> = () => {
    return (
        <div className="w-full">
            <section className="w-full h-auto flex justify-start items-center content-start flex-wrap">
                <ChatListHeader />
                <ChatListMain />
            </section>
        </div>
    );
};

export default ChatListView;
