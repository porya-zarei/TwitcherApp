import { FC } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

interface SendEmojiActionButtonProps {
    
}
 
const SendEmojiActionButton: FC<SendEmojiActionButtonProps> = () => {
    return ( 
        <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-primary mx-1"
                title="add emoji">
                <HiOutlineEmojiHappy size={23} />
            </button>
     );
}
 
export default SendEmojiActionButton;