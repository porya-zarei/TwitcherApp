import {FC, useMemo} from "react";
import {PartialUser} from "../../../../../types/data/user";
import TabMenu from "../../../../core-ui/tab-menu/tab-menu";
import TweetView from "../../../../core-ui/tweet-view/tweet-view";

interface VisitedUserMainProps {
    user?: PartialUser;
}

const VisitedUserMain: FC<VisitedUserMainProps> = ({user}) => {
    const tabData = useMemo(
        () => [
            {
                id: 1,
                title: "Tweets",
                component: (
                    <div className="w-full mt-3 flex justify-center items-center content-start flex-wrap flex-row mb-20">
                        {user?.tweets?.map((tweet) => (
                            <TweetView key={tweet.tweetId} tweet={tweet} />
                        ))}
                    </div>
                ),
            },
            {
                id: 2,
                title: "Replies",
                component: (
                    <div className="w-full mt-3 flex justify-center items-center content-start flex-wrap flex-row mb-20">
                        {user?.replies?.map((tweet) => (
                            <TweetView key={tweet.tweetId} tweet={tweet} />
                        ))}
                    </div>
                ),
            },
            {
                id: 3,
                title: "Media",
                component: (
                    <div className="w-full h-screen"></div>
                ),
            },
            {
                id: 4,
                title: "Likes",
                component: (
                    <div className="w-full h-screen bg-red-300">Likes</div>
                ),
            },
        ],
        [],
    );
    return (
        <div className="w-full mt-3">
            <TabMenu data={tabData} />
        </div>
    );
};

export default VisitedUserMain;
