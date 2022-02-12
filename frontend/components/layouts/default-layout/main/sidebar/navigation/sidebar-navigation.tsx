import {FC} from "react";
import NavigationList from "./list/navigation-list";
import SidebarLogo from "./logo/sidebar-logo";

interface SidebarNavigationProps {}

const SidebarNavigation: FC<SidebarNavigationProps> = () => {
    return (
        <div className="w-full h-auto flex flex-row flex-wrap justify-center items-center content-center">
            <div className="w-full h-auto">
                <SidebarLogo />
            </div>
            <div className="w-full h-auto">
                <NavigationList />
            </div>
        </div>
    );
};

export default SidebarNavigation;
