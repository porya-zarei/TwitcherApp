import {FC} from "react";

interface EmojiProps {
    emoji: string;
    onClick: () => void;
}

const Emoji: FC<EmojiProps> = ({emoji, onClick}) => {
    return (
        <div
            title={emoji}
            role="img"
            onClick={onClick}
            className="w-5 h-5 p-[2px] text-sm flex justify-center items-center hover:bg-slate-500 hover:bg-opacity-20 hover:scale-[2] hover:z-10">
            {emoji}
        </div>
    );
};

export default Emoji;
