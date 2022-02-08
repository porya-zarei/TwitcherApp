import Image from "next/image";
import {FC} from "react";

import defaultProfile from "../../../../../../../assets/images/default-profile.png";
import { Tweet } from "../../../../../../../types/data/tweet";
import { User } from "../../../../../../../types/data/user";
import TweetView from "./tweet-view/tweet-view";

interface TweetsViewProps {}

const fakeTweets: Partial<Tweet>[] = [
    {
        tweetId: "1",
        title: "Tweet 1",
        content: "This is the first tweet",
        createdAt: new Date(),
        hashtags: ["#hashtag1", "#hashtag2"],
        images: [defaultProfile.src],
        likesCount: 0,
        reTweetType: 0,
        sender: {
            userName: "user1",
            fullName: "User 1",
            profileImage: defaultProfile.src,
        } as User,
        video: "",
    },
    {
        tweetId: "2",
        title: "Tweet 1",
        content: "This is the first tweet",
        createdAt: new Date(),
        hashtags: ["#hashtag1", "#hashtag2"],
        images: [defaultProfile.src],
        likesCount: 0,
        reTweetType: 0,
        sender: {
            userName: "user1",
            fullName: "User 1",
            profileImage: defaultProfile.src,
        } as User,
        video: "",
    },
];

const TweetsView: FC<TweetsViewProps> = () => {
    return (
        <div className="w-full flex justify-center items-center content-start flex-wrap flex-row mb-20">
            {fakeTweets.map((tweet) => (
                <TweetView key={tweet.tweetId} tweet={tweet} />
            ))}
        </div>
    );
};

export default TweetsView;
