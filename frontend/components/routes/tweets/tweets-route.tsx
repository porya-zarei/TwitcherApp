import {FC} from "react";
import {useFullTweet} from "../../../api/queries/useFullTweet";
import {useTweetsPageContext} from "../../../contexts/tweets-page-context/tweets-page-context";
import MainLayoutContainer from "../../core-ui/main-layout-container/main-layout-container";
import TweetsLeftSide from "./tweets-left-side/tweets-left-side";
import TweetsRightSide from "./tweets-right-side/tweets-right-side";

interface TweetsRouteProps {}

const TweetsRoute: FC<TweetsRouteProps> = () => {
    return (
        <MainLayoutContainer
            leftSideComponent={<TweetsLeftSide />}
            rightSideComponent={<TweetsRightSide />}
        />
    );
};

export default TweetsRoute;
