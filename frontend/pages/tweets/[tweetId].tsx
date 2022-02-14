import {GetServerSideProps, NextApiRequest, NextPage} from "next";
import {useRouter} from "next/router";
import {dehydrate, QueryClient} from "react-query";
import {handleLoginWithToken} from "../../api/mutations/useLogin";
import {getQueryClient} from "../../api/prefetch/prefetchData";
import {getFeedTweets} from "../../api/queries/useFeedTweets";
import {getFullTweet} from "../../api/queries/useFullTweet";
import TweetsRoute from "../../components/routes/tweets/tweets-route";
import TweetsPageContextProvider from "../../contexts/tweets-page-context/tweets-page-context";
import {PartialFullTweet, PartialTweet} from "../../types/data/tweet";
import {PartialUserWithToken} from "../../types/data/user";
import {getCookieValueServer} from "../../utils/cookies-helpers";
import {decodeToken} from "../../utils/jwt-helper";

interface TweetsPageProps {
    redirect?: boolean;
    feedTweets?: PartialTweet[];
    user?: PartialUserWithToken;
    token?: string;
    fullTweet?: PartialFullTweet;
    tweetId?: string;
}

const TweetsPage: NextPage<TweetsPageProps> = ({fullTweet}) => {
    return (
        <TweetsPageContextProvider initial={{fullTweet: {...fullTweet}}}>
            <TweetsRoute />
        </TweetsPageContextProvider>
    );
};

export default TweetsPage;

export const getServerSideProps: GetServerSideProps<TweetsPageProps> = async ({
    req,
    res,
    query,
}) => {
    const tweetId: string = (query.tweetId as string) || "";
    let token = getCookieValueServer(req as NextApiRequest, "token") || "";
    const response = await handleLoginWithToken(token);
    token = response.result?.token ?? token;
    const decodedToken =
        decodeToken<{UserName: string; FullName: string}>(token);
    const userName: string = decodedToken?.UserName || "";
    const {result: feedTweets} = await getFeedTweets(userName, token)();
    const {result: fullTweet} = await getFullTweet(tweetId, token)();
    const queryClient: QueryClient = await getQueryClient({
        feedTweetsData: {
            tweets: feedTweets,
            userName: userName,
            token,
        },
        fullTweetData: {
            fullTweet: fullTweet,
            token,
            tweetId,
        },
    });
    if (!response.result) {
        res.writeHead(302, {
            Location: "/auth/login",
        });
        res.end();
    }
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            token,
            feedTweets: feedTweets ?? [],
            fullTweet: fullTweet ?? {},
            tweetId,
            user: response.result,
            redirect: !!!response.result,
        },
    };
};
