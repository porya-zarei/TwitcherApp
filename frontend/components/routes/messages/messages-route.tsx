import {FC} from "react";
import { useMessagesContext } from "../../../contexts/messages-context/messages-context";
import MainLayoutContainer from "../../core-ui/main-layout-container/main-layout-container";
import DynamicLayoutContainer from "../../core-ui/main-layout-container/second-layout-container/dynamic-layout-container";
import ChatListView from "./chat-list-view/chat-list-view";
import ChatView from "./chat-view/chat-view";

interface MessagesRouteProps {}

const MessagesRoute: FC<MessagesRouteProps> = () => {
    const {isMobile,isInChat} = useMessagesContext();
    const showChatView = isMobile && isInChat;
    return (
        <DynamicLayoutContainer
            leftSideComponent={<ChatListView />}
            rightSideComponent={<ChatView />}
            leftSideWidth="md:w-5/12"
            rightSideWidth="md:w-7/12"
            hiddenSide={showChatView ? "left" : "right"}
        />
    );
};

export default MessagesRoute;
