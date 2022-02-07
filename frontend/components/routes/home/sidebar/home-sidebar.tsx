import {FC} from "react";
import SidebarAccount from "./account/sidebar-account";
import SidebarNavigation from "./navigation/sidebar-navigation";

interface HomeSidebarProps {}

const HomeSidebar: FC<HomeSidebarProps> = () => {
    return (
        <div className="w-full">
            <div className="w-full min-h-0 md:min-h-screen p-2 flex flex-row flex-wrap justify-center content-between items-center">
                <div className="w-full h-auto">
                    <SidebarNavigation />
                </div>
                <div className="w-full h-auto">
                    <SidebarAccount />
                </div>
            </div>
        </div>
    );
};

export default HomeSidebar;
