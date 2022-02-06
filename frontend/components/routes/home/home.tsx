import {FC} from "react";
import { useHomeContext } from "../../../contexts/home-context";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
        const {feedTweets} = useHomeContext();
    return (
        <>
            {console.log("feedTweets => ", feedTweets)}
            <div>
                {feedTweets?.map((tweet) => (
                    <div key={tweet?.tweetId ?? ""}>{tweet?.title ?? ""}</div>
                ))}
            </div>
        </>
    );
};

export default Home;
