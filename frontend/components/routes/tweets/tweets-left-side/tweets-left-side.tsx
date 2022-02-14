import {FC} from "react";
import TweetsSideContextProvider from "../../../../contexts/tweets-side-context/tweets-side-context";
import MainLayoutSidesContaier from "../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import SendReplyDialog from "../../../core-ui/send-reply-dialog/send-reply-dialog";
import SimpleHeader from "../../../core-ui/simple-header/simple-header";
import MainTweetRepliesView from "./main-tweet-replies-view/main-tweet-replies-view";
import MainTweetView from "./main-tweet-view/main-tweet-view";

interface TweetsLeftSideProps {}

const TweetsLeftSide: FC<TweetsLeftSideProps> = () => {
    return (
        <TweetsSideContextProvider>
            <MainLayoutSidesContaier
                headerComponent={
                    <SimpleHeader
                        title={"Tweets"}
                        withBack={true}
                        containerClassName="h-12 bg-dark bg-opacity-50 backdrop-blur-md"
                    />
                }
                headerContainerClassName="flex-row flex-nowrap"
                mainComponent={
                    <div className="w-full flex justify-center items-start flex-wrap content-start">
                        <MainTweetView />
                        <MainTweetRepliesView />
                        <SendReplyDialog />
                    </div>
                }
            />
        </TweetsSideContextProvider>
    );
};

export default TweetsLeftSide;
