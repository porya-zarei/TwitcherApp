import {FC} from "react";
import UserImages from "./user-images/user-images";
import UserPersonalData from "./user-personal-data/user-personal-data";

interface ProfileRouteProps {}

const ProfileRoute: FC<ProfileRouteProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full min-h-screen h-screen overflow-y-scroll overflow-x-hidden custom-scrollbar flex justify-center items-center content-start flex-wrap flex-row">
                <UserImages />
                <UserPersonalData />
            </div>
        </div>
    );
};

export default ProfileRoute;
