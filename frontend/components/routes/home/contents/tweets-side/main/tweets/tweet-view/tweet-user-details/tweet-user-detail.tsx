import {FC} from "react";
import {HiDotsHorizontal} from "react-icons/hi";

interface TweetUserDetailsProps {
    fullName?: string;
    userName?: string;
}

const TweetUserDetails: FC<TweetUserDetailsProps> = ({fullName, userName}) => {
    return (
        <div className="w-full flex justify-start items-center flex-nowrap flex-row">
            <span className="mr-1">{fullName ?? ""}</span>
            <span className="mr-1">{"@" + userName ?? ""}</span>
            <span className="ml-auto">
                <button
                    type="button"
                    className="bg-transparent border-none text-blue-600"
                    title="more">
                    <HiDotsHorizontal size={20} />
                </button>
            </span>
        </div>
    );
};

export default TweetUserDetails;
