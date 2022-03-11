import {FC} from "react";
import {HiEmojiHappy} from "react-icons/hi";
import EmojisCard from "../../../../core-ui/emojis-card/emojis-card";

interface SendMessageInputProps {}

const SendMessageInput: FC<SendMessageInputProps> = () => {
    return (
        <div className="h-full w-full flex justify-eenly items-center rounded-full border-2 border-primary">
            <input
                placeholder="say something positive :)"
                type="text"
                className="w-full h-full bg-transparent outline-none border-none caret-primary px-2"
            />
            <button
                title="select emoji"
                type="button"
                className="h-full mx-2 text-primary group">
                <HiEmojiHappy size={20} />
                <div className="absolute -top-48 right-0 z-10 hidden group-hover:flex hover:flex p-2 justify-center items-center">
                    <EmojisCard setText={() => {}} />
                </div>
            </button>
        </div>
    );
};

export default SendMessageInput;
