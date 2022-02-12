import {NextPage} from "next";
import {useRouter} from "next/router";

interface TweetsPageProps {}

const TweetsPage: NextPage<TweetsPageProps> = () => {
    const router = useRouter();
    console.log("tweet id => ", router.query.tweetId);
    return <div>hi - {router.query.tweetId}</div>;
};

export default TweetsPage;
