import {FC} from "react";
import {
    HiEmojiHappy,
    HiPaperAirplane,
    HiPhotograph,
    HiVideoCamera,
} from "react-icons/hi";
import {SendICon} from "../../../../core-ui/common/common-icons";
import EmojisCard from "../../../../core-ui/emojis-card/emojis-card";
import SendEmojiActionButton from "../../../../core-ui/send-tweet-action-buttons/btns/send-emoji-action-button";
import SendMessageInput from "./send-message-input";

interface ChatFooterProps {}

const ChatFooter: FC<ChatFooterProps> = () => {
    return (
        <div className="w-full h-full p-1 flex justify-center items-center border-t border-secondary">
            <div className="w-full h-full flex justify-evenly items-center">
                <div className="h-full inline-flex justify-evenly items-center p-2">
                    <button
                        title="select image"
                        type="button"
                        className="mx-1 text-primary">
                        <HiPhotograph size={20} />
                    </button>
                    <button
                        title="select video"
                        type="button"
                        className="mx-1 text-primary">
                        <HiVideoCamera size={20} />
                    </button>
                </div>
                <div className="w-full h-full flex justify-center items-center p-2">
                    <SendMessageInput/>
                </div>
                <div className="h-full p-2 flex justify-center items-center">
                    <button title="send" type="button" className="text-primary">
                        <HiPaperAirplane
                            size={20}
                            className="transition-all rotate-90"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatFooter;
