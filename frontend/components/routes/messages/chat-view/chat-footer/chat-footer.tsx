import {FC, useRef, useState} from "react";
import {
    HiEmojiHappy,
    HiPaperAirplane,
    HiPhotograph,
    HiVideoCamera,
} from "react-icons/hi";
import {useSendMessage} from "../../../../../api/mutations/useSendMessage";
import {useMessagesContext} from "../../../../../contexts/messages-context/messages-context";
import {useUserContext} from "../../../../../contexts/user-context/user-context";
import {MessageData, MessageStatus} from "../../../../../types/data/message";
import {objectToFormData} from "../../../../../utils/helpers";
import {SendICon} from "../../../../core-ui/common/common-icons";
import EmojisCard from "../../../../core-ui/emojis-card/emojis-card";
import SendEmojiActionButton from "../../../../core-ui/send-tweet-action-buttons/btns/send-emoji-action-button";
import MessageFileInputs from "./message-file-inputs/message-file-inputs";
import SendMessageInput from "./send-message-input";

interface ChatFooterProps {}

const ChatFooter: FC<ChatFooterProps> = () => {
    const {selectedChat} = useMessagesContext();
    const {user, token, connection} = useUserContext();
    const {mutateAsync} = useSendMessage();
    const [content, setContent] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const voiceInputRef = useRef<HTMLInputElement>(null);
    const handleSendMessage = async () => {
        connection?.send?.(
            "ChackConnection",
            user?.userName || "",
            connection.connectionId,
        );
        const data: MessageData = {
            chatId: selectedChat?.chatId || "",
            content,
            file: fileInputRef.current?.files?.[0],
            image: imageInputRef.current?.files?.[0],
            video: videoInputRef.current?.files?.[0],
            voice: voiceInputRef.current?.files?.[0],
            messageStatus: MessageStatus.SendedNotSeened,
            senderUserName: user?.userName || "",
        };
        const formData = objectToFormData(data);
        console.log(
            "data => ",
            formData.get("content"),
            data,
            connection?.connectionId,
        );
        const result = await mutateAsync({
            token: token || "",
            formData,
        });
        console.log("result in send message => ", result);
        if (result.result) {
            setContent("");
        }
    };
    return (
        <div className="w-full h-full p-1 flex justify-center items-center border-t border-secondary">
            <div className="w-full h-full flex justify-evenly items-center">
                <MessageFileInputs
                    fileInputRef={fileInputRef}
                    imageInputRef={imageInputRef}
                    videoInputRef={videoInputRef}
                    voiceInputRef={voiceInputRef}
                />
                <div className="w-full h-full flex justify-center items-center p-2">
                    <SendMessageInput
                        content={content}
                        setContent={setContent}
                    />
                </div>
                <div className="h-full p-2 flex justify-center items-center">
                    <button
                        onClick={handleSendMessage}
                        title="send"
                        type="button"
                        className="text-primary">
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
