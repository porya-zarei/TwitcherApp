import {FC} from "react";
import { HiOutlineThumbUp } from "react-icons/hi";
import {useLikeTweet} from "../../../../../api/mutations/useLikeTweet";
import {useUserContext} from "../../../../../contexts/user-context/user-context";

interface LikeActionBtnProps {
    tweetId?: string;
    iconSize?: number;
    likesCount?: number;
}

const LikeActionBtn: FC<LikeActionBtnProps> = ({tweetId,iconSize,likesCount}) => {
    const {token} = useUserContext();
    const {mutateAsync} = useLikeTweet();
    const handleLike = async () => {
        console.log("tweetId => ", tweetId,token);
        const resp = await mutateAsync({
            isLiked: true,
            token: token || "",
            tweetId: tweetId || "",
        });
        console.log("tweet liked => ", resp);
    };
    return (
        <button
            type="button"
            title="like"
            onClick={handleLike}
            className="inline-flex justify-between items-center border-none bg-transparent text-slate-300 group hover:text-pink-500">
            <span className="mx-1 flex justify-center items-center h-10 w-10 rounded-full transition-all group-hover:shadow-md group-hover:bg-slate-400 group-hover:bg-opacity-10">
                <HiOutlineThumbUp size={iconSize} />
            </span>
            <span className="text-sm">{likesCount ?? "0"}</span>
        </button>
    );
};

export default LikeActionBtn;
