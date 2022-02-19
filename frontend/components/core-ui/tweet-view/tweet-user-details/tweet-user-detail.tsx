import Link from "next/link";
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
            <Link href={`/users/${userName||""}`}>
                <a className="bg-transparent border-none font-bold hover:underline mr-3 first-letter:uppercase">
                    {fullName || ""}
                </a>
            </Link>
            <span className="mr-1 text-secondary">{"@" + userName || ""}</span>
            <span className="ml-auto relative">
                <button
                    type="button"
                    className="h-10 w-10 bg-transparent border-none text-blue-600 peer flex justify-center items-center"
                    title="more">
                    <HiDotsHorizontal className="text-xl" />
                </button>
                <div className="scale-0 h-auto w-48 transition-all absolute top-0 right-0 hover:scale-100 peer-hover:scale-100 origin-top-right justify-center items-center z-10">
                    <SimpleCard
                        title="Options"
                        containerClassName="bg-dark shadow-md rounded-md"
                        showMoreButtonClassName="bg-transparent border-none text-blue-600 mt-3 p-2"
                        items={items}
                        renderListItem={(item) => (
                            <div
                                onClick={item.onClick}
                                className="w-full h-full flex justify-start items-start hover:bg-opacity-10 p-3 hover:bg-secondary cursor-pointer">
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
