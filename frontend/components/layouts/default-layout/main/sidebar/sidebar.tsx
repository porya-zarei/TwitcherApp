import {useRouter} from "next/router";
import {FC} from "react";
import SidebarAccount from "./account/sidebar-account";
import SidebarNavigation from "./navigation/sidebar-navigation";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
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

export default Sidebar;
