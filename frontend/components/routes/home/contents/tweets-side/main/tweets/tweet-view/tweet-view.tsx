import Image from "next/image";
import {FC} from "react";
import {Tweet} from "../../../../../../../../types/data/tweet";
import TweetActionButtons from "./tweet-action-buttons/tweet-action-buttons";
import TweetContent from "./tweet-content/tweet-content";
import TweetImages from "./tweet-images/tweet-images";
import TweetUserDetails from "./tweet-user-details/tweet-user-detail";
import TweetUserProfile from "./tweet-user-profile/tweet-user-profile";
interface TweetViewProps {
    tweet: Partial<Tweet>;
}
const iconSize: number = 25;

const TweetView: FC<TweetViewProps> = ({tweet}) => {
    return (
        <article className="w-full flex justify-evenly items-start flex-nowrap flex-row border-b-[1px] border-slate-400 px-2 py-1">
            <header className="flex-1 flex justify-center items-center flex-wrap flex-row">
                <TweetUserProfile profileImage={tweet?.sender?.profileImage} />
            </header>
            <main className="w-full flex justify-center items-center flex-wrap flex-row">
                <TweetUserDetails
                    fullName={tweet?.sender?.fullName}
                    userName={tweet?.sender?.userName}
                />
                <TweetContent content={tweet?.content ?? ""} />
                <TweetImages
                    alt={tweet.title ?? tweet.content ?? ""}
                    images={tweet.images}
                />
                <TweetActionButtons iconSize={iconSize} />
            </main>
        </article>
    );
};

export default TweetView;
