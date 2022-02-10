import {FC} from "react";
import {HiOutlineMenuAlt3} from "react-icons/hi";

interface TweetsSideHeaderProps {}

const TweetsSideHeader: FC<TweetsSideHeaderProps> = () => {
    return (
        <div className="w-full flex justify-between items-center flex-nowrap flex-row h-12 bg-dark bg-opacity-90">
            <div className="px-3">
                <h3 className="text-lg">Home</h3>
            </div>
            <div className="px-3">
                <button
                    type="button"
                    title="change tweets sorting"
                    className="border-none bg-transparent">
                    <HiOutlineMenuAlt3 className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default TweetsSideHeader;
