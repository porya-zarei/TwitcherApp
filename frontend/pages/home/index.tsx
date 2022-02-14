import {GetServerSideProps, NextApiRequest, NextPage} from "next";
import {dehydrate, DehydratedState, QueryClient} from "react-query";
import {handleLoginWithToken} from "../../api/mutations/useLogin";
import {getQueryClient} from "../../api/prefetch/prefetchData";
import {getFeedTweets} from "../../api/queries/useFeedTweets";
import HomeRoute from "../../components/routes/home/home-route";
import HomeContextProvider from "../../contexts/home-context/home-context";
import {Tweet} from "../../types/data/tweet";
import {PartialUserWithToken} from "../../types/data/user";
import {getCookieValueServer} from "../../utils/cookies-helpers";
import {decodeToken} from "../../utils/jwt-helper";

interface HomePageProps {
    redirect?: boolean;
    dehydratedState?: DehydratedState;
    feedTweets?: Tweet[];
    user?: PartialUserWithToken;
    token?: string;
}

const HomePage: NextPage<HomePageProps> = ({feedTweets}) => {
    return (
        <HomeContextProvider initial={{feedTweets}}>
            <HomeRoute />
        </HomeContextProvider>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
    req,res
}) => {
    let token = getCookieValueServer(req as NextApiRequest, "token") ?? "";
    console.log("token", token);
    if (token) {
        const response = await handleLoginWithToken(token);
        token = response.result?.token ?? token;
        const decodedToken =
            decodeToken<{UserName: string; FullName: string}>(token);
        const userName: string = decodedToken?.UserName || "";
        const {result: feedTweets} = await getFeedTweets(userName, token)();
        const queryClient: QueryClient = await getQueryClient({
            feedTweetsData: {
                tweets: feedTweets,
                userName: userName,
                token,
            },
        });
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                redirect: false,
                feedTweets: feedTweets ?? [],
                user: response.result,
                token,
            },
        };
    } else {

        res.writeHead(302, {
            Location: "/auth/login",
        });
        res.end();

        const queryClient: QueryClient = await getQueryClient();
        
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                redirect: true,
                feedTweets: [],
                user: {},
            },
        };
    }
};
