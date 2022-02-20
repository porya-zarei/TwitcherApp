import {FC, useState} from "react";
import {useFollowUnFollow} from "../../../../../../api/mutations/useFollowUnFollow";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useNotification from "../../../../../../hooks/useNotification";
import {PartialUser} from "../../../../../../types/data/user";

interface FollowingButtonProps {
    user?: PartialUser;
}

const FollowingButton: FC<FollowingButtonProps> = ({user}) => {
    const {notify} = useNotification();
    const {token} = useUserContext();
    const {mutateAsync} = useFollowUnFollow();
    const [isFollowed, setIsFollowed] = useState<boolean>(!!user?.isFollowed);
    const handleClick = async () => {
        const result = await mutateAsync({
            userName: user?.userName || "",
            follow: !isFollowed,
            token: token || "",
        });
        if (result?.ok) {
            setIsFollowed(!isFollowed);
            notify(`user ${isFollowed ? "unfollowed" : "followed"}`);
        }
    };
    return (
        <button
            title="Following"
            type="button"
            onClick={handleClick}
            className="hover:text-red-500 h-10 transition-all hover:border-red-500 rounded-full text-white font-bold px-4 border-[1px] border-secondary flex justify-center items-center">
            Following
        </button>
    );
};

export default FollowingButton;
