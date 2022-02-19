import {FC} from "react";
import MainLayoutContainer from "../../core-ui/main-layout-container/main-layout-container";
import UsersRouteLeft from "./users-route-left/user-route-left";
import UsersRouteRight from "./users-route-right/user-route-right";

interface UsersRouteProps {}

const UsersRoute: FC<UsersRouteProps> = () => {
    return (
        <MainLayoutContainer
            leftSideComponent={<UsersRouteLeft />}
            rightSideComponent={<UsersRouteRight />}
        />
    );
};

export default UsersRoute;
