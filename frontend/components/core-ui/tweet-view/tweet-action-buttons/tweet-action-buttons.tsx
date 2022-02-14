import {FC} from "react";
import {
    HiOutlineChatAlt2,
    HiOutlineRefresh,
    HiOutlineThumbUp,
    HiOutlineUpload,
} from "react-icons/hi";
import {useTweetsSideContext} from "../../../../contexts/tweets-side-context/tweets-side-context";
import {PartialTweet} from "../../../../types/data/tweet";

interface TweetActionButtonsProps {
    iconSize?: number;
    tweet?: PartialTweet;
}

const TweetActionButtons: FC<TweetActionButtonsProps> = ({
    iconSize = 18,
    tweet,
}) => {
    const {setShowReplyDialog, setBaseTweet} = useTweetsSideContext();
    const handleReplyClick = () => {
        setShowReplyDialog?.(true);
        tweet && setBaseTweet?.(tweet);
    };
    return (
        <div className="w-full flex justify-between items-center flex-nowrap flex-row my-3">
            <button
                type="button"
                title="reply"
                onClick={handleReplyClick}
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-blue-500">
                <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                    <HiOutlineChatAlt2 size={iconSize} />
                </span>
                <span className="text-sm">20</span>
            </button>
            <button
                type="button"
                title="retweet"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-green-500">
                <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                    <HiOutlineRefresh size={iconSize} />
                </span>
                <span className="text-sm">20</span>
            </button>
            <button
                type="button"
                title="like"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-pink-500">
                <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                    <HiOutlineThumbUp size={iconSize} />
                </span>
                <span className="text-sm">20</span>
            </button>
            <button
                type="button"
                title="share"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-blue-700">
                <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                    <HiOutlineUpload size={iconSize} />
                </span>
            </button>
        </div>
    );
};

export default TweetActionButtons;
