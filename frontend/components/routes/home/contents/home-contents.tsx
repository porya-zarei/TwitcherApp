import {FC} from "react";
import MainLayoutContainer from "../../../core-ui/main-layout-container/main-layout-container";
import SearchSide from "./search-side/search-side";
import TweetsSide from "./tweets-side/tweets-side";

interface HomeContentsProps {}

const HomeContents: FC<HomeContentsProps> = () => {
    return (
        <MainLayoutContainer
            leftSideComponent={<TweetsSide />}
            rightSideComponent={<SearchSide />}
        />
    );
};

export default HomeContents;
