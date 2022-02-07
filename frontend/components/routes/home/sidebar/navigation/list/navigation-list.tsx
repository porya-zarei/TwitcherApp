import {FC} from "react";
import NavigationListItem from "./navigation-list-item";
import { routes } from "./navigation-routes";

interface NavigationListProps {}

const NavigationList: FC<NavigationListProps> = () => {
    return (
        <div className="w-full h-auto">
            <nav className="w-full h-14 md:h-auto flex flex-row flex-wrap justify-evenly md:justify-center items-center content-center">
                {routes.map((route, index) => (
                    <NavigationListItem key={index} {...route} />
                ))}
            </nav>
        </div>
    );
};

export default NavigationList;
