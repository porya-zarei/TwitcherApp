import {GetServerSideProps, NextApiRequest, NextPage} from "next";
import {dehydrate} from "react-query";
import {handleLoginWithToken} from "../../api/mutations/useLogin";
import {getQueryClient} from "../../api/prefetch/prefetchData";
import {getChats} from "../../api/queries/useChats";
import {getFeedTweets} from "../../api/queries/useFeedTweets";
import MessagesRoute from "../../components/routes/messages/messages-route";
import MessagesContextProvider from "../../contexts/messages-context/messages-context";
import {PartialChat} from "../../types/data/chat";
import {getCookieValueServer} from "../../utils/cookies-helpers";
import {decodeToken} from "../../utils/jwt-helper";

interface MessagesPageProps {
    chats?: PartialChat[];
    isMobile?: boolean;
}

const MessagesPage: NextPage<MessagesPageProps> = ({chats, isMobile}) => {
    return (
        <MessagesContextProvider initial={{chats, isMobile}}>
            <MessagesRoute />
        </MessagesContextProvider>
    );
};

export default MessagesPage;

export const getServerSideProps: GetServerSideProps<
    MessagesPageProps
> = async ({req, res}) => {
    let token = getCookieValueServer(req as NextApiRequest, "token") ?? "";
    console.log("token", token);
    if (token) {
        const response = await handleLoginWithToken(token);
        token = response.result?.token ?? token;
        const decodedToken =
            decodeToken<{UserName: string; FullName: string}>(token);
        const userName: string = decodedToken?.UserName || "";
        const {result: feedTweets} = await getFeedTweets(userName, token)();
        const {result: chats} = await getChats(userName, token)();
        const queryClient = await getQueryClient({
            feedTweetsData: {
                tweets: feedTweets,
                userName: userName,
                token,
            },
        });
        const isMobile = req.headers["user-agent"]?.includes("Mobile");
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                feedTweets: feedTweets ?? [],
                user: response.result,
                token,
                chats,
                isMobile,
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
