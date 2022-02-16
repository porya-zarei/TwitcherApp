import {FC} from "react";
import {Tweet} from "../../../types/data/tweet";
import TweetActionButtons from "./tweet-action-buttons/tweet-action-buttons";
import TweetContent from "./tweet-content/tweet-content";
import TweetImages from "./tweet-images/tweet-images";
import TweetUserDetails from "./tweet-user-details/tweet-user-detail";
import TweetUserProfile from "./tweet-user-profile/tweet-user-profile";
interface TweetViewProps {
    tweet: Partial<Tweet>;
    showBaseTweet?: boolean;
}

const TweetView: FC<TweetViewProps> = ({tweet, showBaseTweet = true}) => {
    return (
        <article className="w-full relative flex justify-evenly items-start flex-nowrap flex-row border-b-[1.2px] border-slate-400 px-2 py-1">
            <header className="w-auto flex justify-center items-center flex-wrap flex-row sticky top-12">
                <TweetUserProfile profileImage={tweet?.sender?.profileImage} />
            </header>
            <main className="w-10/12 flex justify-center items-center flex-wrap flex-row">
                <TweetUserDetails
                    fullName={
                        (tweet?.sender?.firstName ?? "") +
                        " " +
                        tweet?.sender?.lastName
                    }
                    userName={tweet?.sender?.userName}
                    tweetId={tweet?.tweetId}
                />
                <TweetContent content={tweet?.content ?? ""} />
                <TweetImages
                    video={tweet?.video}
                    alt={tweet.title || tweet.content || "tweet image"}
                    images={tweet.images}
                />
                <TweetActionButtons tweet={tweet} />
                {showBaseTweet && tweet.baseTweet && (
                    <div className="w-full flex justify-center items-center border-t-2 border-secondary">
                        <TweetView tweet={tweet.baseTweet} />
                    </div>
                )}
            </main>
        </article>
    );
};

export default TweetView;
