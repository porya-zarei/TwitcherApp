import {GetServerSideProps, NextApiRequest, NextPage} from "next";
import {dehydrate, DehydratedState, QueryClient} from "react-query";
import {getQueryClient} from "../../api/prefetch/prefetchData";
import {getFeedTweets} from "../../api/queries/useFeedTweets";
import Home from "../../components/routes/home/home";
import HomeContextProvider from "../../contexts/home-context/home-context";
import {Tweet} from "../../types/data/tweet";
import {getCookieValueServer} from "../../utils/cookies-helpers";

interface HomePageProps {
    redirect?: boolean;
    dehydratedState?: DehydratedState;
    feedTweets?: Tweet[];
}

const HomePage: NextPage<HomePageProps> = ({feedTweets}) => {
    return (
        <HomeContextProvider initial={{feedTweets}}>
            <Home />
        </HomeContextProvider>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
    req,
}) => {
    const token = getCookieValueServer(req as NextApiRequest, "token") ?? "";
    const {result: feedTweets} = await getFeedTweets("user1", token)();
    const queryClient: QueryClient = getQueryClient({
        feedTweetsData: {
            tweets: feedTweets,
            userName: "user1",
            token,
        },
    });
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            redirect: !!token,
            feedTweets: feedTweets ?? [],
        },
    };
};
