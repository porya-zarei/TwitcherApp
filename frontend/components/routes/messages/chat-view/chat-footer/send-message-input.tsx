import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {HiEmojiHappy} from "react-icons/hi";
import EmojisCard from "../../../../core-ui/emojis-card/emojis-card";

interface SendMessageInputProps {
    setContent: Dispatch<SetStateAction<string>>;
    content: string;
}

const SendMessageInput: FC<SendMessageInputProps> = ({setContent, content}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };
    return (
        <div className="h-full w-full flex justify-eenly items-center rounded-full border-2 border-primary">
            <input
                placeholder="say something positive :)"
                type="text"
                value={content}
                onChange={handleChange}
                className="w-full h-full bg-transparent outline-none border-none caret-primary px-2"
            />
            <button
                title="select emoji"
                type="button"
                className="h-full mx-2 text-primary group">
                <HiEmojiHappy size={20} />
                <div className="absolute -top-48 right-0 z-10 hidden group-hover:flex hover:flex p-2 justify-center items-center">
                    <EmojisCard setText={setContent} />
                </div>
            </button>
        </div>
    );
};

export default SendMessageInput;
