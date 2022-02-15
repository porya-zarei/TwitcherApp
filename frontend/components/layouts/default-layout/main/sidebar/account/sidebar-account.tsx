import {FC} from "react";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import Avatar from "../../../../../core-ui/avatar/avatar";
import defaultProfile from "../../../../../../assets/images/default-profile.png";
interface SidebarAccountProps {}

const SidebarAccount: FC<SidebarAccountProps> = () => {
    const {user} = useUserContext();
    return (
        <div className="hidden md:flex justify-end items-center md:justify-start h-auto max-h-12 rounded-md">
            <Avatar
                alt={(user?.firstName || "" + " " + user?.lastName) || "avatar"}
                src={user?.profileImage || defaultProfile}
                layout="intrinsic"
                width={40}
                height={40}
            />
        </div>
    );
};

export default SidebarAccount;
