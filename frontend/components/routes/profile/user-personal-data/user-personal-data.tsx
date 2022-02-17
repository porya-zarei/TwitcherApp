import Image from "next/image";
import {FC} from "react";

import userProfileUpdate from "../../../../assets/images/user_profile_update.svg";
import PersonalDataForm from "./personal-data-form/personal-data-form";
interface UserPersonalDataProps {}

const UserPersonalData: FC<UserPersonalDataProps> = () => {
    return (
        <div className="w-full h-screen min-h-screen flex justify-center items-center bg-dark">
            <div className="w-5/12 h-full flex justify-center items-center">
                <PersonalDataForm/>
            </div>
            <div className="relative w-7/12 h-full p-5 inline-block">
                <Image
                    className="w-full h-full"
                    alt="user profile update"
                    layout="responsive"
                    width={800}
                    height={800}
                    src={userProfileUpdate}
                />
            </div>
        </div>
    );
};

export default UserPersonalData;
