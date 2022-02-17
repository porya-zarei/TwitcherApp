import {Dispatch, FC, SetStateAction} from "react";
import {HiOutlineEmojiHappy} from "react-icons/hi";
import EmojisCard from "../../emojis-card/emojis-card";

interface SendEmojiActionButtonProps {
    updateTweetText?: Dispatch<SetStateAction<string>>;
}

const SendEmojiActionButton: FC<SendEmojiActionButtonProps> = ({updateTweetText}) => {
    return (
        <button
            onClick={() => {}}
            type="button"
            className="relative border-none bg-transparent text-primary mx-1 group"
            title="add emoji">
            <HiOutlineEmojiHappy size={23} />
            <div className="absolute top-0 left-0 z-10 hidden group-hover:flex hover:flex p-2 justify-center items-center">
                <EmojisCard setText={updateTweetText} />
            </div>
        </button>
    );
};

export default SendEmojiActionButton;
