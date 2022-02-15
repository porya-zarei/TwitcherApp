import {FC} from "react";
import {
    HiOutlineChatAlt2,
    HiOutlineRefresh,
    HiOutlineThumbUp,
    HiOutlineUpload,
} from "react-icons/hi";
import {useLikeTweet} from "../../../../api/mutations/useLikeTweet";
import {useTweetsSideContext} from "../../../../contexts/tweets-side-context/tweets-side-context";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import {PartialTweet} from "../../../../types/data/tweet";
import LikeActionBtn from "./like-action-btn/like-action-btn";

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
    const {token} = useUserContext();
    const {mutateAsync} = useLikeTweet();
    const handleLike = async () => {
        const resp = await mutateAsync({
            isLiked: true,
            token: token || "",
            tweetId: tweet?.tweetId || "",
        });
        console.log("tweet liked => ", resp);
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
                <span className="text-sm">{tweet?.repliesCount ?? "0"}</span>
            </button>
            <button
                type="button"
                title="retweet"
                className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-green-500">
                <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                    <HiOutlineRefresh size={iconSize} />
                </span>
                <span className="text-sm">{tweet?.retweetsCount ?? "0"}</span>
            </button>
            <LikeActionBtn
                tweetId={tweet?.tweetId}
                likesCount={tweet?.likesCount}
                iconSize={iconSize}
            />
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
