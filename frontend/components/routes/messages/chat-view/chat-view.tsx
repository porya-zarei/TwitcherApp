import {FC} from "react";
import {useMessagesContext} from "../../../../contexts/messages-context/messages-context";
import ChatFooter from "./chat-footer/chat-footer";
import ChatHeader from "./chat-header/chat-header";
import ChatMain from "./chat-main/chat-main";

interface ChatViewProps {}

const ChatView: FC<ChatViewProps> = () => {
    const {isMobile} = useMessagesContext();
    const showChatView = isMobile ? "hidden" : "block";
    return (
        <div className={`w-full min-h-screen h-screen`}>
            <section className="flex justify-start items-start flex-wrap w-full h-full relative overflow-hidden">
                <header className="w-full h-[20vh] sticky top-0 z-10">
                    <ChatHeader />
                </header>
                <main className="w-full h-[70vh]">
                    <ChatMain />
                </main>
                <footer className="w-full h-[10vh] sticky bottom-0 z-10">
                    <ChatFooter />
                </footer>
            </section>
        </div>
    );
};

export default ChatView;
