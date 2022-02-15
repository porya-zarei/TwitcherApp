import {FC} from "react";
import {useTweetsSideContext} from "../../../../contexts/tweets-side-context/tweets-side-context";
import defaultProfile from "../../../../assets/images/default-profile.png";
import Avatar from "../../avatar/avatar";

interface DialogBaseTweetPreviewProps {}

const DialogBaseTweetPreview: FC<DialogBaseTweetPreviewProps> = () => {
    const {baseTweet} = useTweetsSideContext();
    return (
        <div className="w-full p-4 rounded-sm mt-2 flex justify-center items-center flex-row flex-nowrap bg-secondary bg-opacity-10">
            <div className="w-auto h-full flex justify-center items-start mr-3">
                <Avatar
                    alt="replied user profile"
                    src={(baseTweet?.sender?.profileImage ?? defaultProfile) || defaultProfile}
                    layout="intrinsic"
                    width={50}
                    height={50}
                />
            </div>
            <div className="w-full h-full flex justify-start items-baseline flex-wrap">
                <span className="w-full">Reply To :{baseTweet?.sender?.firstName??"" + " " + baseTweet?.sender?.lastName}</span>
                <p className="w-full">text : {baseTweet?.content}</p>
            </div>
        </div>
    );
};

export default DialogBaseTweetPreview;
