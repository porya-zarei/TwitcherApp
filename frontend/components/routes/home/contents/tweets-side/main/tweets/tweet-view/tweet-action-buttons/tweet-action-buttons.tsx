import { FC } from "react";
import { HiOutlineChatAlt2, HiOutlineRefresh, HiOutlineThumbUp, HiOutlineUpload } from "react-icons/hi";

interface TweetActionButtonsProps {
    iconSize?: number;
}
 
const TweetActionButtons: FC<TweetActionButtonsProps> = ({iconSize=20}) => {
    return (
        <div className="w-full flex justify-between items-center flex-nowrap flex-row my-3">
            <button
                type="button"
                title="reply"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300">
                <span className="mx-1">
                    <HiOutlineChatAlt2 size={iconSize} />
                </span>
                <span>20</span>
            </button>
            <button
                type="button"
                title="retweet"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300">
                <span className="mx-1">
                    <HiOutlineRefresh size={iconSize} />
                </span>
                <span>20</span>
            </button>
            <button
                type="button"
                title="like"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300">
                <span className="mx-1">
                    <HiOutlineThumbUp size={iconSize} />
                </span>
                <span>20</span>
            </button>
            <button
                type="button"
                title="share"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300">
                <span className="mx-1">
                    <HiOutlineUpload size={iconSize} />
                </span>
            </button>
        </div>
    );
}
 
export default TweetActionButtons;