import {Dispatch, FC, SetStateAction} from "react";
import {
    HiOutlinePhotograph,
    HiOutlineCalendar,
    HiOutlineFilm,
    HiOutlineEmojiHappy,
    HiOutlineLocationMarker,
    HiOutlineChartBar,
} from "react-icons/hi";
import SendEmojiActionButton from "./btns/send-emoji-action-button";
import SendEventActionButton from "./btns/send-event-action-button";
import SendImageActionButton from "./btns/send-image-action-button";
import SendLocationActionButton from "./btns/send-location-action-button";
import SendVideoActionButton from "./btns/send-video-action-button";

interface SendTweetActionButtonsProps {
    images?: FileList;
    setImages?: Dispatch<SetStateAction<File[]>>;
    setVideo?: Dispatch<SetStateAction<File>>;
    updateTweetText?: Dispatch<SetStateAction<string>>;
}

const SendTweetActionButtons: FC<SendTweetActionButtonsProps> = ({
    setImages,
    setVideo,
    updateTweetText,
}) => {
    return (
        <div className="w-full">
            <SendImageActionButton setImages={setImages} />
            <SendVideoActionButton setVideo={setVideo} />
            <SendEventActionButton />
            <SendEmojiActionButton updateTweetText={updateTweetText} />
            <SendLocationActionButton />
        </div>
    );
};

export default SendTweetActionButtons;
