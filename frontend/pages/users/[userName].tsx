import {GetServerSideProps, NextApiRequest} from "next";
import {FC} from "react";
import {dehydrate} from "react-query";
import {handleLoginWithToken} from "../../api/mutations/useLogin";
import {getQueryClient} from "../../api/prefetch/prefetchData";
import {getFeedTweets} from "../../api/queries/useFeedTweets";
import {getVisitedUser} from "../../api/queries/useVisitedUser";
import UsersRoute from "../../components/routes/users/users-route";
import UsersPageContextProvider from "../../contexts/users-page-context/users-page-context";
import {getCookieValueServer} from "../../utils/cookies-helpers";
import {decodeToken} from "../../utils/jwt-helper";

interface UsersPageProps {}

const UsersPage: FC<UsersPageProps> = () => {
    return (
        <UsersPageContextProvider>
            <UsersRoute />
        </UsersPageContextProvider>
    );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async ({
    req,
    res,
    query,
}) => {
    let token = getCookieValueServer(req as NextApiRequest, "token") ?? "";
    if (token) {
        const response = await handleLoginWithToken(token);
        token = response.result?.token ?? token;
        const decodedToken =
            decodeToken<{UserName: string; FullName: string}>(token);
        const userName: string = decodedToken?.UserName || "";
        const {result: feedTweets} = await getFeedTweets(userName, token)();
        const queryClient = await getQueryClient({
            feedTweetsData: {
                tweets: feedTweets,
                userName: userName,
                token,
            },
        });
        const visitedUserUseName = query.userName as string;
        await queryClient.prefetchQuery(
            "visitedUser",
            getVisitedUser(visitedUserUseName, token),
            {staleTime: 100000},
        );
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                feedTweets: feedTweets ?? [],
                user: response.result,
                token,
                visitedUser: {},
            },
        };
    } else {
        res.writeHead(302, {
            Location: "/auth/login",
        });
        res.end();
        const queryClient = await getQueryClient();
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
