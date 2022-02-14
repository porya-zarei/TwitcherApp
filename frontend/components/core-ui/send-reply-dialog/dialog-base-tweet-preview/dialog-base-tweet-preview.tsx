import {FC} from "react";
import {useTweetsSideContext} from "../../../../contexts/tweets-side-context/tweets-side-context";

interface DialogBaseTweetPreviewProps {}

const DialogBaseTweetPreview: FC<DialogBaseTweetPreviewProps> = () => {
    const {baseTweet} = useTweetsSideContext();
    return (
        <div className="w-full p-4 rounded-sm mt-2 flex justify-center items-center flex-row flex-wrap bg-secondary bg-opacity-10">
            <span className="w-full">Reply To :</span>
            <p className="w-full">{baseTweet?.content}</p>
        </div>
    );
};

export default DialogBaseTweetPreview;
