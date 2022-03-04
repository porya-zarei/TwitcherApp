import {FC} from "react";
import MainLayoutContainer from "../../core-ui/main-layout-container/main-layout-container";
import ExploreRouteLeft from "./explore-route-left/explore-route-left";
import ExploreRouteRight from "./explore-route-right/explore-route-right";

interface ExploreRouteProps {}

const ExploreRoute: FC<ExploreRouteProps> = () => {
    return (
        <MainLayoutContainer
            leftSideComponent={<ExploreRouteLeft />}
            rightSideComponent={<ExploreRouteRight />}
        />
    );
};

export default ExploreRoute;
