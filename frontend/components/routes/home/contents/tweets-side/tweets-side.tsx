import {FC} from "react";
import TweetsSideContextProvider from "../../../../../contexts/tweets-side-context/tweets-side-context";
import MainLayoutSidesContaier from "../../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import TweetsSideHeader from "./header/tweets-side-header";
import TweetsSideMain from "./main/tweets-side-main";

interface TweetsSideProps {}

const TweetsSide: FC<TweetsSideProps> = () => {
    return (
        <TweetsSideContextProvider>
            <MainLayoutSidesContaier
                headerComponent={<TweetsSideHeader />}
                headerContainerClassName="flex-row flex-nowrap"
                mainComponent={<TweetsSideMain />}
            />
        </TweetsSideContextProvider>
    );
};

export default TweetsSide;
