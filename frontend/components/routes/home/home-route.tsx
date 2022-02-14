import {FC} from "react";
import HomeContents from "./contents/home-contents";

interface HomeRouteProps {}

const HomeRoute: FC<HomeRouteProps> = () => {
    return <HomeContents />;
};

export default HomeRoute;
