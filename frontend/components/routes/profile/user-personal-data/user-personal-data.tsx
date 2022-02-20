import Image from "next/image";
import {FC} from "react";

import userProfileUpdate from "../../../../assets/images/user_profile_update.svg";
import PersonalDataForm from "./personal-data-form/personal-data-form";
interface UserPersonalDataProps {}

const UserPersonalData: FC<UserPersonalDataProps> = () => {
    return (
        <div className="w-full h-screen min-h-screen flex justify-center items-center content-start flex-row-reverse md:flex-row flex-wrap md:flex-nowrap bg-dark">
            <div className="w-full md:w-5/12 h-auto md:h-full my-1 md:my-0 flex justify-center items-start md:justify-center">
                <PersonalDataForm/>
            </div>
            <div className="relative w-full md:w-7/12 h-auto md:h-full p-5 inline-block">
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
