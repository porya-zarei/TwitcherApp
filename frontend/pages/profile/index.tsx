import {GetServerSideProps, NextApiRequest, NextPage} from "next";
import { dehydrate, QueryClient } from "react-query";
import { handleLoginWithToken } from "../../api/mutations/useLogin";
import { getQueryClient } from "../../api/prefetch/prefetchData";
import { getFeedTweets } from "../../api/queries/useFeedTweets";
import ProfileRoute from "../../components/routes/profile/profile-route";
import { getCookieValueServer } from "../../utils/cookies-helpers";
import { decodeToken } from "../../utils/jwt-helper";

interface ProfilePageProps {}

const PtofilePage: NextPage<ProfilePageProps> = () => {
    return <ProfileRoute />;
};

export default PtofilePage;

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
    req,
    res,
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