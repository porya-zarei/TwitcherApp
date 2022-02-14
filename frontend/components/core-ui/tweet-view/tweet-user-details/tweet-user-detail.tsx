import {useRouter} from "next/router";
import { FC} from "react";
import {HiDotsHorizontal} from "react-icons/hi";
import SimpleCard from "../../../core-ui/simple-card/simple-card";

interface TweetUserDetailsProps {
    fullName?: string;
    userName?: string;
    tweetId?: string;
}

const TweetUserDetails: FC<TweetUserDetailsProps> = ({
    fullName,
    userName,
    tweetId,
}) => {
    const router = useRouter();
    const items = [
        {
            id: 1,
            title: "See Tweet",
            onClick: () => {
                if (tweetId && !router.pathname.includes(tweetId)) {
                    
                }
                router.push(`/tweets/${tweetId}`);
            },
        },
    ];
    return (
        <div className="w-full flex justify-start items-center flex-nowrap flex-row">
            <span className="mr-1">{fullName ?? ""}</span>
            <span className="mr-1">{"@" + userName ?? ""}</span>
            <span className="ml-auto relative">
                <button
                    type="button"
                    className="bg-transparent border-none text-blue-600 peer"
                    title="more">
                    <HiDotsHorizontal size={20} />
                </button>
                <div className="hidden h-auto w-48 absolute top-0 right-0 hover:flex peer-hover:flex justify-center items-center z-10">
                    <SimpleCard
                        title="Options"
                        containerClassName="bg-dark border-2 border-secondary rounded-md"
                        showMoreButtonClassName="bg-transparent border-none text-blue-600 mt-3 p-2"
                        items={items}
                        renderListItem={(item) => (
                            <div onClick={item.onClick} className="w-full h-full flex justify-start items-start hover:bg-opacity-10 p-3 hover:bg-secondary cursor-pointer">
                                {item.title}
                            </div>
                        )}
                    />
                </div>
            </span>
        </div>
    );
};

export default TweetUserDetails;
